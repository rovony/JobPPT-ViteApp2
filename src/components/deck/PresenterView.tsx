// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, MonitorPlay, Maximize, Minimize, HelpCircle, FolderOpen, BookOpen, LayoutPanelLeft, PanelLeftClose, PanelLeftOpen, PanelBottomClose, PanelBottomOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useDeck } from '@/lib/deck-store';
import { useSpeakerNotes } from '@/lib/useSpeakerNotes';
import { useAnticipatedQA } from '@/lib/useAnticipatedQA';
import { usePresenterLayout, COLUMN_KEYS } from '@/lib/usePresenterLayout';
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
import PresenterLayoutSettings from './PresenterLayoutSettings';
import NotesQAHelp from './NotesQAHelp';

/** Per-section default vertical split when a column has 2+ sections. With
 *  only one section, that panel uses 100% height. */
const SECTION_PANEL_SIZE = {
  assistant:     { defaultSize: 100, minSize: 30 },
  notes:         { defaultSize: 60,  minSize: 30 },
  anticipatedQA: { defaultSize: 40,  minSize: 18 },
  nowTile:       { defaultSize: 40,  minSize: 20 },
  nextTile:      { defaultSize: 20,  minSize: 12 },
  audienceQA:    { defaultSize: 40,  minSize: 20 },
};

/** Default horizontal share per column — only applied when the column
 *  has at least one visible section. Other columns' percentages auto-
 *  redistribute via PanelGroup. */
const COLUMN_DEFAULT_SIZE = {
  left:   24,
  center: 50,
  right:  26,
};

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
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [notesQAHelpOpen, setNotesQAHelpOpen] = useState(false);
  // Per-device section visibility + column assignment + within-column order.
  // Persisted under presenter:layout — survives reloads, scoped to device.
  const layout = usePresenterLayout();

  /** Wrap a section in a flex-column with a thin "Hide" header strip
   *  above the content. Putting the Hide button in its own row prevents
   *  overlap with the section's internal header controls (Edit, Debug,
   *  AI settings, etc.). When the section is hidden, a matching "Show"
   *  pill renders in the body-area restore strip so the user can
   *  re-expand without opening the Layout modal. */
  const wrapWithCollapseButton = (key, content) => {
    const cfg = QUICK_COLLAPSE[key];
    if (!cfg) return content;
    const Icon = cfg.icon;
    return (
      <div className="h-full flex flex-col min-h-0">
        <div className="flex justify-end shrink-0 px-1 pb-1">
          <button
            type="button"
            onClick={() => layout.toggleVisibility(key)}
            title={`Hide ${cfg.label} — re-show via the bar at the top of the body area`}
            aria-label={`Hide ${cfg.label}`}
            className="deck-mono uppercase flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
            style={{
              borderColor: 'var(--cream-hairline)',
              color: 'var(--cream-muted)',
              fontSize: '0.55rem',
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            <Icon className="w-3 h-3" /> Hide
          </button>
        </div>
        <div className="flex-1 min-h-0">{content}</div>
      </div>
    );
  };

  /** Sections that get a quick-collapse overlay button. Clicking the button
   *  hides the section via usePresenterLayout — same effect as the Eye/EyeOff
   *  toggle in PresenterLayoutSettings, just one click instead of opening a
   *  modal. A floating restore strip (top-right of the body area) brings any
   *  hidden section back without re-opening the layout modal either. */
  const QUICK_COLLAPSE = {
    anticipatedQA: { label: 'Q&A panel',  icon: PanelLeftClose,   restoreIcon: PanelLeftOpen },
    assistant:     { label: 'Assistant',  icon: PanelBottomClose, restoreIcon: PanelBottomOpen },
    audienceQA:   { label: 'Audience Q&A', icon: PanelRightClose,  restoreIcon: PanelRightOpen },
  };

  /** Render a single section. Closes over all the deck-level state so
   *  any column can host any section without prop-drilling. */
  const renderSection = (key) => {
    if (key === 'assistant') {
      return wrapWithCollapseButton(key, (
        <PresenterAssistant
          deck={deck}
          currentSlide={current}
          currentNote={currentNote}
          onOpenSources={() => setSourcesOpen(true)}
        />
      ));
    }
    if (key === 'notes') {
      return (
        <div className="h-full flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2 px-1 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="deck-mono uppercase truncate"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--case, var(--amber))',
                }}
              >
                Speaker notes
                {current?.title && (
                  <span className="ml-2" style={{ color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono)' }}>
                    · Slide {String(index + 1).padStart(2, '0')}
                  </span>
                )}
              </div>
            </div>
            <span
              className="deck-mono shrink-0"
              style={{
                fontSize: '0.6rem',
                letterSpacing: 'var(--ls-mono)',
                color: saving ? 'var(--amber)' : 'var(--cream-faint)',
              }}
            >
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
            onShowHelp={() => setNotesQAHelpOpen(true)}
          />
        </div>
      );
    }
    if (key === 'anticipatedQA') {
      return wrapWithCollapseButton(key, (
        <AnticipatedQAPane
          value={currentQA}
          onChange={onQAChange}
          editing={qaEditing}
          setEditing={setQaEditing}
          slideKey={current?.id || index}
          itemCount={currentQACount}
          hasOverride={current ? hasQAOverride(current.id) : false}
          onResetToFile={current ? () => { clearQA(current.id); setQaEditing(false); } : undefined}
          onShowHelp={() => setNotesQAHelpOpen(true)}
        />
      ));
    }
    if (key === 'nowTile') {
      return (
        <TilePanel
          label="Now on screen"
          labelColor="var(--case, var(--amber))"
          sublabel={current?.title}
          SlideComponent={current?.component}
          deck={deck}
          emphasis
        />
      );
    }
    if (key === 'nextTile') {
      return (
        <TilePanel
          label="Next up"
          labelColor="var(--cream-faint)"
          sublabel={nextSlide?.title || '— end of deck —'}
          SlideComponent={nextSlide?.component}
          deck={deck}
        />
      );
    }
    if (key === 'audienceQA') {
      return wrapWithCollapseButton(
        key,
        <div className="h-full min-h-0 flex flex-col pt-1">
          <QAModerationPane deck={deck} currentSlide={current} />
        </div>,
      );
    }
    return null;
  };
  // Notes-collapse logic was retired in Phase 12 — visibility is now
  // owned by usePresenterLayout (`presenter:layout` key). The N keyboard
  // shortcut still toggles notes, but it now flips notes visibility
  // instead of collapsing a panel.

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
        // Toggle notes section visibility (was: panel collapse)
        e.preventDefault();
        layout.toggleVisibility('notes');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
     
  }, [layout]);

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
          <IconPill onClick={() => setLayoutOpen(true)} title="Show, hide, and reorder sections">
            <LayoutPanelLeft className="w-3.5 h-3.5" /> Layout
          </IconPill>
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

      {/* ═══════════ BODY — fully dynamic 3-column layout ═══════════
          Each section (assistant · notes · anticipatedQA · nowTile ·
          nextTile · audienceQA) lives in a column (left/center/right)
          per the user's saved layout. Sections can be:
            – hidden via Layout settings (eye toggle)
            – moved between columns (← / →)
            – reordered within a column (↑ / ↓)
          Empty columns disappear; surviving columns expand to fill.
         ═══════════════════════════════════════════════════════════════ */}
      {/* Restore strip — sticky bar at top of body area. Renders the
          full set of quick-collapse sections; each hidden one shows a
          prominent amber-bordered "Show" pill, each visible one is
          hidden. Always visible when any section is hidden, so the
          user can never lose their way back to the section. */}
      {Object.entries(QUICK_COLLAPSE).some(([k]) => !layout.visibility[k]) && (
        <div
          className="flex items-center gap-2 px-3 py-2 border-b shrink-0"
          style={{
            borderColor: 'var(--cream-hairline)',
            background: 'var(--bg)',
          }}
        >
          <span
            className="deck-mono uppercase shrink-0"
            style={{
              fontSize: '0.58rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            Hidden:
          </span>
          {Object.entries(QUICK_COLLAPSE).map(([k, cfg]) => {
            if (layout.visibility[k]) return null;
            const Icon = cfg.restoreIcon;
            return (
              <button
                key={k}
                type="button"
                onClick={() => layout.toggleVisibility(k)}
                title={`Show ${cfg.label}`}
                aria-label={`Show ${cfg.label}`}
                className="deck-mono uppercase flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
                style={{
                  borderColor: 'var(--case, var(--amber))',
                  color: 'var(--case, var(--amber))',
                  fontSize: '0.62rem',
                  letterSpacing: 'var(--ls-mono)',
                }}
              >
                <Icon className="w-3.5 h-3.5" /> Show {cfg.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex-1 min-h-0 px-2 py-3 relative">
        <PanelGroup direction="horizontal" autoSaveId="presenter-cols">
          {COLUMN_KEYS.filter((col) => layout.visibleIn(col).length > 0).map((col, idx, visibleCols) => (
            <React.Fragment key={col}>
              {idx > 0 && <VResizeHandle />}
              <Panel
                id={`col-${col}`}
                order={COLUMN_KEYS.indexOf(col) + 1}
                defaultSize={COLUMN_DEFAULT_SIZE[col]}
                minSize={16}
                className="flex min-h-0 min-w-0 flex-col overflow-hidden"
              >
                <ColumnRenderer
                  column={col}
                  sectionKeys={layout.visibleIn(col)}
                  renderSection={renderSection}
                />
              </Panel>
            </React.Fragment>
          ))}
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
        deckId={deck.id}
      />
      <PresenterLayoutSettings
        open={layoutOpen}
        onClose={() => setLayoutOpen(false)}
        layout={layout}
      />
      <NotesQAHelp
        open={notesQAHelpOpen}
        onClose={() => setNotesQAHelpOpen(false)}
      />
    </div>
  );
}

/* ================================================================
   Resize handles — vertical (column splitter) + horizontal (row splitter).
   A visible hairline on hover/drag makes the drag affordance discoverable.
   ================================================================ */
/* ColumnRenderer — each visible section in a vertical PanelGroup so a
   solo section gets 100% height; 2+ sections share the column with the
   same draggable horizontal handles as between main columns. */
function ColumnRenderer({ column, sectionKeys, renderSection }) {
  if (sectionKeys.length === 0) return null;
  const n = sectionKeys.length;
  return (
    <div className="box-border h-full min-h-0 w-full min-w-0 overflow-hidden px-2">
      <PanelGroup
        direction="vertical"
        autoSaveId={`col-${column}-stack`}
        className="h-full min-h-0 w-full"
      >
        {sectionKeys.map((key, idx, arr) => {
          const isLast = idx === arr.length - 1;
          const cfg = SECTION_PANEL_SIZE[key] || { defaultSize: 100 / n, minSize: 12 };
          const defaultSize = n === 1 ? 100 : cfg.defaultSize;
          const minSize = n === 1 ? 12 : cfg.minSize;
          return (
            <React.Fragment key={key}>
              <Panel
                id={`section-${key}`}
                order={idx + 1}
                defaultSize={defaultSize}
                minSize={minSize}
                className="flex min-h-0 min-w-0 flex-col overflow-hidden"
              >
                <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                  {renderSection(key)}
                </div>
              </Panel>
              {!isLast && <HResizeHandle />}
            </React.Fragment>
          );
        })}
      </PanelGroup>
    </div>
  );
}

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
