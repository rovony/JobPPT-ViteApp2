import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Sparkles, FolderOpen, BarChart3, FlaskConical } from 'lucide-react';
import { DECKS } from '@/decks/registry';
import DeckSourcesDialog from '@/components/deck/DeckSourcesDialog';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';
import { useAuth } from '@/lib/AuthContext';

/**
 * MonoChip — small uppercase mono pill used across the deck chrome.
 * size="md" = page-level navigation chips (PK Sim, Dev Kit)
 * size="sm" = card-level action chips (Analytics, Sources)
 *
 * Renders as <Link>, <button>, or <span> via the `as` prop. Token-driven
 * (cream-hairline border, cream-muted ink, ls-mono tracking) so theme
 * + light/dark switching flows through with zero per-instance overrides.
 */
export function MonoChip({ as: As = 'span', size = 'md', className = '', children, ...props }) {
  const sizeClass =
    size === 'sm'
      ? 'text-[0.58rem] px-2.5 py-1'
      : 'text-[0.62rem] px-3 py-1.5';
  return (
    <As
      className={`deck-mono uppercase inline-flex items-center gap-1.5 rounded-full border transition-colors hover:bg-[var(--cream-ghost)] ${sizeClass} ${className}`}
      style={{
        borderColor: 'var(--cream-hairline)',
        color: 'var(--cream-muted)',
        letterSpacing: 'var(--ls-mono)',
      }}
      {...props}
    >
      {children}
    </As>
  );
}

export default function Home() {
  const [sourcesDeck, setSourcesDeck] = useState(null); // { id, title } | null
  const { mode, toggle } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  return (
    <div data-deck-theme="clinical" className="deck-root">
      <div className="max-w-[var(--deck-max-w)] mx-auto px-[var(--deck-gutter)] py-12 sm:py-20 md:py-28">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          {/* Stack the eyebrow above the chip cluster on narrow viewports
              so PK Sim / Dev Kit / theme toggle never overflow the row. */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="deck-mono text-xs tracking-[0.22em] uppercase text-deck-accent flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Deck Studio
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <MonoChip as={Link} to="/pk-sim">
                <FlaskConical className="w-3 h-3" /> PK Simulator
              </MonoChip>
              {isAdmin && (
                <MonoChip as={Link} to="/dev">Dev Kit</MonoChip>
              )}
              <ThemeToggle mode={mode} onToggle={toggle} />
            </div>
          </div>
          <h1 className="deck-display text-4xl sm:text-5xl md:text-7xl leading-[0.95] text-deck-ink max-w-4xl">
            Code-driven decks<br/>with a shared grammar.
          </h1>
          <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg deck-ink-muted leading-relaxed">
            A unified design system, motion vocabulary, and composable patterns —
            so every presentation feels like it came from the same studio.
          </p>
        </motion.header>

        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="deck-mono text-xs uppercase tracking-[0.22em] deck-ink-subtle flex items-center gap-2">
              <Layers className="w-3 h-3" /> Decks · {DECKS.length}
            </div>
            <div className="deck-mono text-xs deck-ink-subtle hidden md:block">
              ← → navigate · O overview · Esc close
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DECKS.map((d, i) => (
              <DeckCard
                key={d.id}
                deck={d}
                index={i}
                themeMode={mode}
                onOpenSources={() => setSourcesDeck({ id: d.id, title: d.title })}
              />
            ))}
          </div>
        </section>

        <DeckSourcesDialog
          open={!!sourcesDeck}
          onClose={() => setSourcesDeck(null)}
          deckId={sourcesDeck?.id}
          deckTitle={sourcesDeck?.title}
        />

        <footer className="mt-24 pt-8 border-t deck-rule deck-mono text-xs deck-ink-subtle flex flex-col md:flex-row gap-3 md:justify-between">
          <div>Deck Studio · internal preview</div>
          <div>Built on a tokens-driven design system · theme-swappable</div>
        </footer>
      </div>
    </div>
  );
}

function DeckCard({ deck, index, themeMode, onOpenSources }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.2, 0.8, 0.2, 1] }}
      data-deck-theme={deck.theme}
      data-theme-mode={themeMode}
      className="relative group rounded-xl border border-deck-rule bg-deck-surface hover:bg-deck-surface-elevated transition-colors duration-deck-base ease-deck-out overflow-hidden flex flex-col"
    >
      <Link to={`/Deck?id=${deck.id}`} className="block">
        <div className="aspect-[16/10] p-5 sm:p-6 flex flex-col justify-between relative">
          <div className="deck-mono text-[10px] tracking-[0.22em] uppercase deck-ink-subtle">
            {deck.slides.length} slides · {deck.theme}
          </div>
          <div className="pr-8">
            <div className="deck-display text-xl sm:text-2xl md:text-3xl text-deck-ink leading-tight">
              {deck.title}
            </div>
            {deck.subtitle && (
              <div className="mt-2 text-xs sm:text-sm deck-ink-muted">{deck.subtitle}</div>
            )}
          </div>
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-deck-ink-subtle group-hover:text-deck-accent transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
      {/* Action footer — siblings of the Link so chip clicks never navigate
          to the deck and the chips can never overlap subtitle text. */}
      <div
        className="flex items-center justify-end gap-1.5 px-3 sm:px-4 py-2.5 border-t"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <MonoChip
          as={Link}
          to={`/decks/${deck.id}/analytics`}
          size="sm"
          aria-label={`View analytics for ${deck.title}`}
        >
          <BarChart3 className="w-3 h-3" /> Analytics
        </MonoChip>
        <MonoChip
          as="button"
          size="sm"
          onClick={() => onOpenSources?.()}
          aria-label={`Manage sources for ${deck.title}`}
        >
          <FolderOpen className="w-3 h-3" /> Sources
        </MonoChip>
      </div>
    </motion.div>
  );
}