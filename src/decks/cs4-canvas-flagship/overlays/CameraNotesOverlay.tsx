// @ts-nocheck
/**
 * CameraNotesOverlay — bottom drawer with speaker notes for the
 * current camera. Toggled by the `N` key (handler in
 * KeyboardCameraNav).
 *
 * Renders the markdown body from notes.ts via react-markdown (already
 * a dep of merck-deck). Drawer animates in/out with framer-motion.
 *
 * Z-index sits above the canvas content (z=10) but below modals.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCanvasCamera } from '../canvas/CameraController';
import { noteFor } from '../notes';
import { EASE_EDITORIAL, DUR } from '../themes';

export default function CameraNotesOverlay() {
  const { cameraIndex, finaleStage, notesOpen, toggleNotes } = useCanvasCamera();
  const note = noteFor(cameraIndex);

  const stageBadge = cameraIndex === 10 && finaleStage > 1
    ? ` · S${finaleStage}`
    : '';

  return (
    <AnimatePresence>
      {notesOpen && note && (
        <motion.div
          key="notes-drawer"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            maxHeight: '50vh',
            background: 'color-mix(in srgb, var(--bg, #0D1B2A) 92%, transparent)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderTop: '1px solid color-mix(in srgb, var(--case, #7BAE7F) 30%, transparent)',
            color: 'var(--cream, #F5F0E8)',
            zIndex: 10,
            overflowY: 'auto',
            padding: '20px 32px 32px',
            fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            fontSize: 15,
            lineHeight: 1.55,
          }}
        >
          {/* Header — close button + title + spoken duration */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 12,
              borderBottom: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 12%, transparent)',
              paddingBottom: 8,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--case, #7BAE7F)',
                  marginBottom: 4,
                }}
              >
                {note.title}{stageBadge}
              </div>
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 11,
                  color: 'color-mix(in srgb, var(--cream, #F5F0E8) 60%, transparent)',
                }}
              >
                ~{note.spokenSec}s · press N to close
              </div>
            </div>
            <button
              onClick={toggleNotes}
              style={{
                background: 'transparent',
                border: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 30%, transparent)',
                color: 'var(--cream, #F5F0E8)',
                padding: '4px 10px',
                borderRadius: 4,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              close
            </button>
          </div>

          {/* Markdown body */}
          <div
            className="cs4-notes-md"
            style={{
              maxWidth: '78ch',
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.body}</ReactMarkdown>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
