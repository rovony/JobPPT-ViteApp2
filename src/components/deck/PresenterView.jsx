import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, MonitorPlay, Maximize, Minimize, HelpCircle, FolderOpen, PanelRightClose, PanelRightOpen, BookOpen } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useDeck } from '@/lib/deck-store';
import { useSpeakerNotes } from '@/lib/useSpeakerNotes';
import { useAnticipatedQA } from '@/lib/useAnticipatedQA';
import { makeChannel, broadcast, subscribe } from '@/lib/presenter-sync';
import PresenterTimer from './PresenterTimer';
import SlidePreview from './SlidePreview';
import PresenterNotesPane from './PresenterNotesPane';
import AnticipatedQAPane from './AnticipatedQAPane';
import PresenterAssistant from './PresenterAssistant';
import ShortcutsOverlay from './ShortcutsOverlay';
import DeckSourcesDialog from './DeckSourcesDialog';
import QAModerationPane from './QAModerationPane';
import ReadingMaterialPane from './ReadingMaterialPane';

/**
 * PresenterView v2 — notes-centric layout for live delivery.
 *
 * Layout:
 *   ┌────────────────────────────────────────┐
 *   │ Top bar (timer · slide · actions)      │
 *   ├────────────────────────────────────────┤
 *   │                                        │
 *   │         SPEAKER NOTES  (hero)          │
 *   │         reading-optimized              │
 *   │                                ┌──────┐│
 *   │                                │ Next ││
 *   │                                ├──────┤│
 *   │                                │ Now  ││
 *   │                                └──────┘│
 *   ├────────────────────────────────────────┤
 *   │ Prev · dots · Next                     │
 *   └────────────────────────────────────────┘
 *
 * Slide tiles pinned bottom-right keep the presenter's eyes on the notes.
 * Cross-tab BroadcastChannel still keeps a dual-screen audience in sync.
 */
export default function PresenterView({ deck, onClose, onToggleFullscreen, isFullscreen }) {
  const { index, total, prev, next, goto } = useDeck();
  const { getNote, saveNote, clearNote, hasOverride, saving, loaded } = useSpeakerNotes(
    deck.id,
    deck.notes,
  );
  // Anticipated Q&A — parallel pipe to speaker notes, separate localStorage
  // namespace. Static fallback comes from `deck.qa` (loaded from <deck>/qa.js).
  const {
    getQA, saveQA, clearQA, hasOverride: hasQAOverride, countItems: qaCount,
    saving: qaSaving, loaded: qaLoaded,
  } = useAnticipatedQA(deck.id, deck.qa);
  const [editing, setEditing] = useState(false);
  const [qaEditing, setQaEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [readingOpen, setReadingOpen] = useState(false);
  // Notes pane collapse — persisted so the presenter's preference survives reloads.
  const [notesCollapsed, setNotesCollapsed] = useState(() => {
    try { return localStorage.getItem('presenter:notes-collapsed') === '1'; } catch { return false; }
  });
  const notesPanelRef = useRef(null);
  useEffect(() => {
    try { localStorage.setItem('presenter:notes-collapsed', notesCollapsed ? '1' : '0'); } catch {}
    const panel = notesPanelRef.current;
    if (!panel) return;
    if (notesCollapsed && !panel.isCollapsed()) panel.collapse();
    if (!notesCollapsed && panel.isCollapsed()) panel.expand();
  }, [notesCollapsed]);

  const current = deck.slides[index];
  const nextSlide = deck.slides[index + 1];
  const currentNote = getNote(current?.id);
  const currentQA = getQA(current?.id);
  const currentQACount = qaCount(current?.id);

  useEffect(() => { setDraft(currentNote); setEditing(false); setQaEditing(false); }, [index, currentNote]);

  const onDraftChange = (v) => {
    setDraft(v);
    if (current) saveNote(current.id, index, v);
  };

  const onQAChange = (v) => {
    if (current) saveQA(current.id, index, v);
  };

  /* Cross-tab sync */
  const channelRef = useRef(null);
  const suppressRef = useRef(false);

  useEffect(() => {
    channelRef.current = makeChannel();
    const unsub = subscribe(channelRef.current, deck.id, (msg) => {
      if (msg?.type === 'goto' && typeof msg.index === 'number' && msg.index !== index) {
        suppressRef.current = true;
        goto(msg.index);
      } else if (msg?.type === 'close') {
        onClose?.();
      }
    });
    return () => { unsub(); channelRef.current?.close?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck.id]);

  useEffect(() => {
    if (suppressRef.current) { suppressRef.current = false; return; }
    broadcast(channelRef.current, deck.id, { type: 'goto', index });
  }, [index, deck.id]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const isEditable = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable;
      if (isEditable) return;
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setHelpOpen((v) => !v);
      } else if (e.key === 'n' || e.key === 'N') {
        // Toggle notes sidebar
        e.preventDefault();
        setNotesCollapsed((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const presentOnAnotherScreen = () => {
    // Path-segment URL — /decks/:id/s/:slide/audience. Bookmark-friendly,
    // self-documenting, and survives reload (the previous ?audience=1 query
    // flag was vulnerable to the same URL↔store race that the speaker side
    // hit). The named window handle (`deck-audience-${deckId}`) means
    // re-clicking this button re-uses the existing audience tab.
    const slideId = deck.slides?.[index]?.id ?? String(index);
    const url = `${window.location.origin}/decks/${encodeURIComponent(deck.id)}/s/${encodeURIComponent(slideId)}/audience`;
    window.open(url, `deck-audience-${deck.id}`, 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-deck-presenter overflow-hidden flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      {/* ═══════════ TOP BAR ═══════════ */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b shrink-0 gap-4"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <div className="flex items-center gap-6 min-w-0">
          <PresenterTimer />
          <div className="deck-mono uppercase shrink-0" style={{ color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono)' }}>
            <div style={{ fontSize: '0.6rem' }}>Slide</div>
            <div style={{ fontSize: '1.25rem', color: 'var(--cream)' }} className="tabular-nums">
              {String(index + 1).padStart(2, '0')}
              <span style={{ color: 'var(--cream-faint)' }}> / {String(total).padStart(2, '0')}</span>
            </div>
          </div>
          {current?.title && (
            <div className="hidden md:block min-w-0">
              <div className="deck-mono uppercase"
                   style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}>
                Now presenting
              </div>
              <div className="deck-display truncate"
                   style={{ color: 'var(--cream)', fontSize: '1.1rem', fontWeight: 500, maxWidth: '50ch' }}>
                {current.title}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {Array.isArray(deck.reading) && deck.reading.length > 0 && (
            <IconPill onClick={() => setReadingOpen(true)} title="Pre-talk reading material">
              <BookOpen className="w-3.5 h-3.5" /> Reading
            </IconPill>
          )}
          <IconPill onClick={() => setSourcesOpen(true)} title="Deck sources (AI library)">
            <FolderOpen className="w-3.5 h-3.5" /> Sources
          </IconPill>
          <IconPill onClick={presentOnAnotherScreen} title="Open audience display">
            <MonitorPlay className="w-3.5 h-3.5" /> Dual screen
          </IconPill>
          {onToggleFullscreen && (
            <IconPill onClick={onToggleFullscreen} title={isFullscreen ? 'Exit fullscreen · F' : 'Fullscreen · F'}>
              {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            </IconPill>
          )}
          <IconPill onClick={() => setHelpOpen(true)} title="Shortcuts · ?">
            <HelpCircle className="w-3.5 h-3.5" /> Help
          </IconPill>
          <button
            onClick={onClose}
            className="deck-mono text-xs uppercase flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors"
            style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)', letterSpacing: 'var(--ls-mono)' }}
            aria-label="Close presenter view"
          >
            Close · P <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ═══════════ BODY — 3 resizable columns ═══════════
          LEFT   : AI assistant
          CENTER : Speaker notes (hero)
          RIGHT  : Slide tiles — Now (big) · Next (small), also resizable
          All dividers drag; layout persists via autoSaveId.
         ═══════════════════════════════════════════════════ */}
      <div className="flex-1 min-h-0 px-2 py-3">
        <PanelGroup direction="horizontal" autoSaveId="presenter-cols">
          {/* ── LEFT: AI assistant ─────────────────────── */}
          <Panel defaultSize={24} minSize={16} order={1}>
            <div className="h-full px-2">
              <PresenterAssistant
                deck={deck}
                currentSlide={current}
                currentNote={currentNote}
                onOpenSources={() => setSourcesOpen(true)}
              />
            </div>
          </Panel>

          <VResizeHandle />

          {/* ── CENTER: speaker notes (collapsible sidebar) ── */}
          <Panel
            ref={notesPanelRef}
            defaultSize={50}
            minSize={30}
            order={2}
            collapsible
            collapsedSize={0}
            onCollapse={() => setNotesCollapsed(true)}
            onExpand={() => setNotesCollapsed(false)}
          >
            <div className="h-full px-2 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-2 px-1 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={() => setNotesCollapsed(true)}
                    title="Hide speaker notes · N"
                    aria-label="Hide speaker notes"
                    className="h-6 w-6 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] shrink-0"
                    style={{ color: 'var(--cream-muted)' }}
                  >
                    <PanelRightClose className="w-3.5 h-3.5" />
                  </button>
                  <div className="deck-mono uppercase truncate"
                       style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}>
                    Speaker notes
                    {current?.title && (
                      <span className="ml-2" style={{ color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono)' }}>
                        · Slide {String(index + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </div>
                <span className="deck-mono shrink-0"
                      style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono)',
                               color: saving ? 'var(--amber)' : 'var(--cream-faint)' }}>
                  {!loaded ? 'Loading…' : saving ? 'Saving…' : 'Autosaved'}
                </span>
              </div>
              <PresenterNotesPane
                value={editing ? draft : currentNote}
                onChange={onDraftChange}
                editing={editing}
                setEditing={setEditing}
                placeholder="No notes yet. Click Edit to add speaker notes — supports **bold**, *italic*, ==highlight==, bullets, and headings."
                slideKey={current?.id || index}
                hasOverride={current ? hasOverride(current.id) : false}
                onResetToFile={current ? () => { clearNote(current.id); setEditing(false); } : undefined}
              />
              {/* Anticipated Q&A — collapsible section below the notes
                  textarea. Auto-expanded when the slide has prep content,
                  auto-collapsed otherwise. Lives in the same Center column
                  so notes + Q&A are scannable in one glance during delivery. */}
              <AnticipatedQAPane
                value={currentQA}
                onChange={onQAChange}
                editing={qaEditing}
                setEditing={setQaEditing}
                slideKey={current?.id || index}
                itemCount={currentQACount}
                hasOverride={current ? hasQAOverride(current.id) : false}
                onResetToFile={current ? () => { clearQA(current.id); setQaEditing(false); } : undefined}
              />
              <div className="deck-mono mt-2 px-1"
                   style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}>
                ← → navigate · P close · N toggle notes · ? help
              </div>
            </div>
          </Panel>

          {/* Floating "Show notes" trigger — appears only when the pane is collapsed */}
          {notesCollapsed && (
            <button
              onClick={() => setNotesCollapsed(false)}
              title="Show speaker notes · N"
              aria-label="Show speaker notes"
              className="absolute top-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 px-2.5 py-2 rounded-r-md border-l-0 border transition-colors hover:bg-[var(--cream-ghost)]"
              style={{
                left: 'calc(24% + 8px)', // roughly after the assistant column's default
                borderColor: 'var(--cream-hairline)',
                background: 'var(--panel)',
                color: 'var(--cream-muted)',
              }}
            >
              <PanelRightOpen className="w-3.5 h-3.5" />
              <span className="deck-mono uppercase"
                    style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)' }}>
                Notes
              </span>
            </button>
          )}

          <VResizeHandle />

          {/* ── RIGHT: tiles (top) + Q&A (bottom), vertically resizable ─────── */}
          <Panel defaultSize={26} minSize={20} order={3}>
            <div className="h-full px-2">
              <PanelGroup direction="vertical" autoSaveId="presenter-tiles">
                <Panel defaultSize={40} minSize={20}>
                  <TilePanel
                    label="Now on screen"
                    labelColor="var(--case, var(--amber))"
                    sublabel={current?.title}
                    SlideComponent={current?.component}
                    deck={deck}
                    emphasis
                  />
                </Panel>
                <HResizeHandle />
                <Panel defaultSize={20} minSize={12}>
                  <TilePanel
                    label="Next up"
                    labelColor="var(--cream-faint)"
                    sublabel={nextSlide?.title || '— end of deck —'}
                    SlideComponent={nextSlide?.component}
                    deck={deck}
                  />
                </Panel>
                <HResizeHandle />
                <Panel defaultSize={40} minSize={20}>
                  <div className="h-full pt-1">
                    <QAModerationPane deck={deck} currentSlide={current} />
                  </div>
                </Panel>
              </PanelGroup>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* ═══════════ BOTTOM BAR — nav + dots ═══════════ */}
      <div
        className="flex items-center justify-between gap-4 px-6 py-3 border-t shrink-0"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex items-center gap-2 h-10 px-4 rounded-full border transition-colors disabled:opacity-30 shrink-0"
          style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream)' }}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <div className="flex gap-1.5 overflow-x-auto max-w-[60%] px-2">
          {deck.slides.map((s, i) => (
            <button
              key={s.id || i}
              onClick={() => goto(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 rounded-full transition-all shrink-0"
              style={{
                width: i === index ? 22 : 8,
                background: i === index ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={index === total - 1}
          className="flex items-center gap-2 h-10 px-4 rounded-full border transition-colors disabled:opacity-30 shrink-0"
          style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream)' }}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <ShortcutsOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
      <DeckSourcesDialog
        open={sourcesOpen}
        onClose={() => setSourcesOpen(false)}
        deckId={deck.id}
        deckTitle={deck.title}
      />
      <ReadingMaterialPane
        open={readingOpen}
        onClose={() => setReadingOpen(false)}
        readingItems={deck.reading || []}
        deckTitle={deck.title}
      />
    </div>
  );
}

/* ================================================================
   Resize handles — vertical (column splitter) + horizontal (row splitter).
   A visible hairline on hover/drag makes the drag affordance discoverable.
   ================================================================ */
function VResizeHandle() {
  return (
    <PanelResizeHandle className="group relative w-2 shrink-0">
      <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-px transition-colors group-hover:w-0.5"
           style={{ background: 'var(--cream-hairline)' }} />
      <div className="absolute inset-y-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-0.5 rounded-full opacity-0 group-hover:opacity-100 group-data-[resize-handle-state=drag]:opacity-100"
           style={{ background: 'var(--case, var(--amber))' }} />
    </PanelResizeHandle>
  );
}

function HResizeHandle() {
  return (
    <PanelResizeHandle className="group relative h-2 shrink-0">
      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-px transition-colors group-hover:h-0.5"
           style={{ background: 'var(--cream-hairline)' }} />
      <div className="absolute inset-x-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 group-data-[resize-handle-state=drag]:opacity-100"
           style={{ background: 'var(--case, var(--amber))' }} />
    </PanelResizeHandle>
  );
}

/* ================================================================
   TilePanel — labelled slide thumbnail that fills its container.
   ================================================================ */
function TilePanel({ label, labelColor, sublabel, SlideComponent, deck, emphasis }) {
  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex items-center gap-2 mb-1.5 px-1">
        {emphasis && (
          <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: labelColor }} />
        )}
        <span className="deck-mono uppercase shrink-0"
              style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)', color: labelColor }}>
          {label}
        </span>
        {sublabel && (
          <span className="deck-mono truncate"
                style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}>
            · {sublabel}
          </span>
        )}
      </div>
      <div className="flex-1 min-h-0 rounded-md overflow-hidden border flex items-center justify-center"
           style={{ borderColor: emphasis ? 'var(--case, var(--amber))' : 'var(--cream-hairline)', background: 'var(--panel)' }}>
        <FittedSlide SlideComponent={SlideComponent} deck={deck} />
      </div>
    </div>
  );
}

/**
 * FittedSlide — measures its container and computes the scale needed
 * to fit a 1920×1080 slide inside. SlidePreview sizes itself from
 * W*scale × H*scale, so FittedSlide only supplies the scale and
 * centers the result.
 */
function FittedSlide({ SlideComponent, deck }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0.15);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      // Leave a small margin (4px each side) so the preview never
      // touches the container edge.
      setScale(Math.min((width - 8) / 1920, (height - 8) / 1080));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center overflow-hidden">
      <SlidePreview SlideComponent={SlideComponent} deck={deck} scale={scale} />
    </div>
  );
}

function IconPill({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="deck-mono uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
      style={{
        borderColor: 'var(--cream-hairline)',
        color: 'var(--cream-muted)',
        fontSize: '0.62rem',
        letterSpacing: 'var(--ls-mono)',
      }}
    >
      {children}
    </button>
  );
}