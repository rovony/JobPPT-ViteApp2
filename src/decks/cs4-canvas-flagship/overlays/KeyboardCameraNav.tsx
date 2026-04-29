// @ts-nocheck
/**
 * KeyboardCameraNav — listens for keyboard input at CAPTURE phase
 * and updates the canvas's camera state. Calls stopPropagation so
 * DeckRunner's own arrow-key advance handler does NOT fire — we want
 * arrows to move the camera within the canvas, not navigate to the
 * (non-existent) next slide.
 *
 * Bindings:
 *   →  / Space     advance one camera (or one finale stage if at C10)
 *   ←  / Backspace retreat one camera (or one finale stage if at C10)
 *   1..9 / 0       jump to camera 1..9 / 10
 *   N              toggle speaker-notes drawer
 *   Escape         close notes drawer if open
 *
 * Renders nothing (behavioral component).
 */

import { useEffect } from 'react';
import { useCanvasCamera } from '../canvas/CameraController';

export default function KeyboardCameraNav() {
  const {
    advance,
    retreat,
    jumpTo,
    toggleNotes,
    notesOpen,
    setNotesOpen,
  } = useCanvasCamera();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Don't intercept when the user is typing in an input
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) {
        return;
      }

      const key = e.key;

      switch (key) {
        case 'ArrowRight':
        case ' ':
        case 'Spacebar':
        case 'PageDown':
          e.preventDefault();
          e.stopPropagation();
          advance();
          break;

        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          e.stopPropagation();
          retreat();
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          e.stopPropagation();
          toggleNotes();
          break;

        case 'Escape':
          if (notesOpen) {
            e.preventDefault();
            e.stopPropagation();
            setNotesOpen(false);
          }
          break;

        case '1': case '2': case '3': case '4': case '5':
        case '6': case '7': case '8': case '9':
          e.preventDefault();
          e.stopPropagation();
          jumpTo(parseInt(key, 10));
          break;

        case '0':
          e.preventDefault();
          e.stopPropagation();
          jumpTo(10);
          break;

        default:
          // Let other keys propagate to DeckRunner (e.g. Cmd-K for
          // command palette, presenter-mode toggles, etc.)
          break;
      }
    }

    // Capture phase = fires BEFORE bubbling listeners. DeckRunner's
    // useKeyboardNav uses bubble-phase, so capture-phase here gets
    // first crack at arrow keys.
    window.addEventListener('keydown', onKeyDown, /* capture */ true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, /* capture */ true);
    };
  }, [advance, retreat, jumpTo, toggleNotes, notesOpen, setNotesOpen]);

  return null;
}
