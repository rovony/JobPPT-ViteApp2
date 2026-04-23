import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Sparkles, FolderOpen, BarChart3, FlaskConical } from 'lucide-react';
import { DECKS } from '@/decks/registry';
import DeckSourcesDialog from '@/components/deck/DeckSourcesDialog';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';
import { useAuth } from '@/lib/AuthContext';

export default function Home() {
  const [sourcesDeck, setSourcesDeck] = useState(null); // { id, title } | null
  const { mode, toggle } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  return (
    <div data-deck-theme="clinical" className="deck-root">
      <div className="max-w-[var(--deck-max-w)] mx-auto px-[var(--deck-gutter)] py-20 md:py-28">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="deck-mono text-xs tracking-[0.22em] uppercase text-deck-accent flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Deck Studio
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/pk-sim"
                className="deck-mono uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
                style={{
                  borderColor: 'var(--cream-hairline)',
                  color: 'var(--cream-muted)',
                  fontSize: '0.62rem',
                  letterSpacing: 'var(--ls-mono)',
                }}
              >
                <FlaskConical className="w-3 h-3" /> PK Simulator
              </Link>
              {isAdmin && (
                <Link
                  to="/dev"
                  className="deck-mono uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
                  style={{
                    borderColor: 'var(--cream-hairline)',
                    color: 'var(--cream-muted)',
                    fontSize: '0.62rem',
                    letterSpacing: 'var(--ls-mono)',
                  }}
                >
                  Dev Kit
                </Link>
              )}
              <ThemeToggle mode={mode} onToggle={toggle} />
            </div>
          </div>
          <h1 className="deck-display text-5xl md:text-7xl leading-[0.95] text-deck-ink max-w-4xl">
            Code-driven decks<br/>with a shared grammar.
          </h1>
          <p className="mt-8 max-w-2xl text-lg deck-ink-muted leading-relaxed">
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
      className="relative group rounded-xl border border-deck-rule bg-deck-surface hover:bg-deck-surface-elevated transition-colors duration-deck-base ease-deck-out overflow-hidden"
    >
      <Link
        to={`/Deck?id=${deck.id}`}
        className="block"
      >
        <div className="aspect-[16/10] p-6 flex flex-col justify-between relative">
          <div className="deck-mono text-[10px] tracking-[0.22em] uppercase deck-ink-subtle">
            {deck.slides.length} slides · {deck.theme}
          </div>
          <div>
            <div className="deck-display text-2xl md:text-3xl text-deck-ink leading-tight">
              {deck.title}
            </div>
            {deck.subtitle && (
              <div className="mt-2 text-sm deck-ink-muted">{deck.subtitle}</div>
            )}
          </div>
          <div className="absolute top-5 right-5 text-deck-ink-subtle group-hover:text-deck-accent transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
      {/* Action buttons — outside the Link so they don't navigate to the deck */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
        <Link
          to={`/decks/${deck.id}/analytics`}
          onClick={(e) => e.stopPropagation()}
          className="deck-mono uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
          style={{
            borderColor: 'var(--cream-hairline)',
            color: 'var(--cream-muted)',
            fontSize: '0.58rem',
            letterSpacing: 'var(--ls-mono)',
            background: 'color-mix(in srgb, var(--bg) 60%, transparent)',
            backdropFilter: 'blur(4px)',
          }}
          aria-label={`View analytics for ${deck.title}`}
        >
          <BarChart3 className="w-3 h-3" /> Analytics
        </Link>
        <button
          onClick={(e) => { e.stopPropagation(); onOpenSources?.(); }}
          className="deck-mono uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
          style={{
            borderColor: 'var(--cream-hairline)',
            color: 'var(--cream-muted)',
            fontSize: '0.58rem',
            letterSpacing: 'var(--ls-mono)',
            background: 'color-mix(in srgb, var(--bg) 60%, transparent)',
            backdropFilter: 'blur(4px)',
          }}
          aria-label={`Manage sources for ${deck.title}`}
        >
          <FolderOpen className="w-3 h-3" /> Sources
        </button>
      </div>
    </motion.div>
  );
}