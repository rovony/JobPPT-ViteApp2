import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { EASE } from "../assets/easings";

type Props = {
  /** unique id used as layoutId for the FLIP morph between tile and modal */
  panelId: string;
  /** Title shown in the panel header (small) and modal header (larger) */
  title: string;
  /** subtle label above the title */
  eyebrow?: string;
  /** the panel content — renders identically in tile and modal modes */
  children: ReactNode;
  /** whether to display a "click to expand" affordance */
  affordance?: boolean;
};

/**
 * D2 — Click-to-Zoom Modal (ZoomablePanel).
 * A panel that expands into a centered modal at ~88% of the viewport via
 * FLIP / layoutId morph. Esc or backdrop-click closes it.
 *
 * Uses Lucide icons (X) to demonstrate that lib's role.
 */
export function ZoomablePanel({
  panelId,
  title,
  eyebrow,
  children,
  affordance = true,
}: Props) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Tile mode (always rendered; hides when modal opens to avoid double FLIP target) */}
      {!open && (
        <motion.button
          layoutId={panelId}
          onClick={() => setOpen(true)}
          className="zp__tile"
          aria-label={`Expand ${title}`}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.6, ease: EASE.expoOut }
          }
        >
          <div className="zp__panel-inner">
            {eyebrow && <div className="zp__eyebrow">{eyebrow}</div>}
            <div className="zp__title">{title}</div>
            <div className="zp__body">{children}</div>
            {affordance && (
              <div className="zp__affordance">CLICK TO EXPAND</div>
            )}
          </div>
        </motion.button>
      )}

      {/* Modal mode */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="zp__backdrop"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              layoutId={panelId}
              className="zp__modal"
              role="dialog"
              aria-modal="true"
              aria-label={title}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.6, ease: EASE.expoOut }
              }
            >
              <div className="zp__panel-inner zp__panel-inner--modal">
                <button
                  className="zp__close"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
                {eyebrow && <div className="zp__eyebrow">{eyebrow}</div>}
                <div className="zp__title zp__title--modal">{title}</div>
                <div className="zp__body zp__body--modal">{children}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
