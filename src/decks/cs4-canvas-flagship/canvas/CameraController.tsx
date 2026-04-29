// @ts-nocheck
/**
 * CameraController — single source of truth for camera state.
 *
 * Holds: cameraIndex (1..10), finaleStage (1..4, only meaningful at
 * cameraIndex === 10), notesOpen (boolean — N-key drawer toggle).
 *
 * Components that READ this state:
 *   - CanvasStage           (parent transform animates to current camera position)
 *   - TracingBeamHost       (progress fill = cameraIndex / 10)
 *   - CameraNotesOverlay    (which note section to render)
 *   - ZoneI-Future2034      (only visible when at cameraIndex===10 stage 4)
 *   - Cinematic 1/3/4 useEffects (gate "play sequence" on entering camera)
 *
 * Components that WRITE this state:
 *   - KeyboardCameraNav     (arrow keys / space / number row)
 *   - HashCameraSync        (#cam-N URL hash updates)
 *
 * NOT a pinia/zustand store. React Context is enough — cameraIndex
 * changes are uncommon (~10 times per 15-min talk) and re-renders are
 * cheap because the heavy DOM (zones) only re-renders when its own
 * camera-derived props change (e.g. opacity, content-visibility).
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CAMERA_POSITIONS, CAMERA_FINALE_STAGES } from '../data';

interface CameraState {
  /** 1..10 — current camera position. */
  cameraIndex: number;
  /** 1..4 — current finale sub-stage (only meaningful when cameraIndex===10). */
  finaleStage: number;
  /** Whether the speaker-notes drawer is open. */
  notesOpen: boolean;
}

interface CameraActions {
  /** Set camera index, clamped to [1, 10]. Resets finaleStage to 1 when
   *  arriving at camera 10. */
  setCameraIndex: (n: number) => void;
  /** Advance one position (or one finale stage if at C10). */
  advance: () => void;
  /** Retreat one position (or one finale stage if at C10). */
  retreat: () => void;
  /** Jump directly to camera N. */
  jumpTo: (n: number) => void;
  /** Set finale stage (1..4). */
  setFinaleStage: (s: number) => void;
  /** Toggle the notes drawer. */
  toggleNotes: () => void;
  /** Set notes open/closed explicitly. */
  setNotesOpen: (open: boolean) => void;
  /** Whether we're currently in a camera transition (consumed by
   *  cinematic-effect gates so they don't fire mid-transition). */
  isTransitioning: boolean;
}

type CameraContextShape = CameraState & CameraActions;

const CameraContext = createContext<CameraContextShape | null>(null);

interface CameraControllerProps {
  initialCamera?: number;
  initialFinaleStage?: number;
  children: React.ReactNode;
}

export function CameraController({
  initialCamera = 1,
  initialFinaleStage = 1,
  children,
}: CameraControllerProps) {
  const [cameraIndex, setCameraIndexState] = useState(
    Math.max(1, Math.min(10, initialCamera))
  );
  const [finaleStage, setFinaleStageState] = useState(
    Math.max(1, Math.min(4, initialFinaleStage))
  );
  const [notesOpen, setNotesOpen] = useState(false);
  const [isTransitioning, setTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  // Whenever cameraIndex changes, mark transitioning for the duration
  // of the camera move. Cinematic-effect gates inside zones can use
  // this to defer "play sequence" until the camera arrives.
  useEffect(() => {
    setTransitioning(true);
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    const dur = (CAMERA_POSITIONS[cameraIndex]?.duration ?? 1.4) * 1000;
    transitionTimerRef.current = window.setTimeout(
      () => setTransitioning(false),
      dur + 50  // small buffer
    );
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, [cameraIndex]);

  const setCameraIndex = useCallback((n: number) => {
    const clamped = Math.max(1, Math.min(10, Math.round(n)));
    setCameraIndexState((prev) => {
      if (clamped === 10 && prev !== 10) {
        // Arriving at finale — reset stage to 1
        setFinaleStageState(1);
      }
      return clamped;
    });
  }, []);

  const setFinaleStage = useCallback((s: number) => {
    const clamped = Math.max(1, Math.min(4, Math.round(s)));
    setFinaleStageState(clamped);
  }, []);

  const advance = useCallback(() => {
    setCameraIndexState((prev) => {
      if (prev === 10) {
        // Already at finale — advance the finale sub-stage
        setFinaleStageState((s) => Math.min(4, s + 1));
        return 10;
      }
      return Math.min(10, prev + 1);
    });
  }, []);

  const retreat = useCallback(() => {
    setCameraIndexState((prev) => {
      if (prev === 10) {
        // Inside finale — retreat sub-stage first
        setFinaleStageState((s) => {
          if (s > 1) return s - 1;
          // At stage 1 — retreating goes back to camera 9
          setCameraIndexState(9);
          return 1;
        });
        return 10;
      }
      return Math.max(1, prev - 1);
    });
  }, []);

  const jumpTo = useCallback((n: number) => {
    setCameraIndex(n);
  }, [setCameraIndex]);

  const toggleNotes = useCallback(() => {
    setNotesOpen((o) => !o);
  }, []);

  const value = useMemo<CameraContextShape>(
    () => ({
      cameraIndex,
      finaleStage,
      notesOpen,
      isTransitioning,
      setCameraIndex,
      setFinaleStage,
      advance,
      retreat,
      jumpTo,
      toggleNotes,
      setNotesOpen,
    }),
    [cameraIndex, finaleStage, notesOpen, isTransitioning, setCameraIndex, setFinaleStage, advance, retreat, jumpTo, toggleNotes]
  );

  return <CameraContext.Provider value={value}>{children}</CameraContext.Provider>;
}

/** Hook — read camera state + actions. Throws if used outside <CameraController>. */
export function useCanvasCamera(): CameraContextShape {
  const ctx = useContext(CameraContext);
  if (!ctx) {
    throw new Error(
      'useCanvasCamera() must be used inside <CameraController>. ' +
      'Did you forget to wrap your tree?'
    );
  }
  return ctx;
}

/** Convenience: returns the active camera position (handles finale sub-stages). */
export function useActiveCameraPosition() {
  const { cameraIndex, finaleStage } = useCanvasCamera();
  if (cameraIndex === 10) {
    return CAMERA_FINALE_STAGES[Math.max(0, Math.min(3, finaleStage - 1))];
  }
  return CAMERA_POSITIONS[cameraIndex];
}
