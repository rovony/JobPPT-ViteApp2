import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { ShieldAlert } from 'lucide-react';

/**
 * AdminRoute — route guard for admin-only pages (e.g. /dev).
 *
 * Behavior:
 *   • Not authenticated  → redirect to login via AuthContext
 *   • Authenticated, not admin → show a polite "Admins only" screen
 *   • Admin → render children
 *
 * Kept intentionally small. No business logic beyond the role check.
 */
export default function AdminRoute({ children }) {
  const { user, isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigateToLogin();
    return null;
  }

  if (user?.role !== 'admin') {
    return (
      <div
        data-deck-theme="clinical"
        className="deck-root flex items-center justify-center"
        style={{ minHeight: '100vh', padding: 'var(--space-12)' }}
      >
        <div
          style={{
            maxWidth: 460,
            textAlign: 'center',
            padding: 'var(--space-10)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--panel)',
          }}
        >
          <ShieldAlert
            className="w-10 h-10 mx-auto"
            style={{ color: 'var(--case, var(--amber))', marginBottom: 'var(--space-4)' }}
          />
          <div
            className="deck-display"
            style={{
              fontSize: '1.5rem',
              color: 'var(--cream)',
              marginBottom: 'var(--space-3)',
              fontWeight: 600,
            }}
          >
            Admins only
          </div>
          <div
            className="deck-body"
            style={{
              color: 'var(--cream-muted)',
              fontSize: 'var(--fs-body-sm)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-6)',
            }}
          >
            The Dev Kit is restricted to administrators. If you believe this is an error,
            contact your workspace admin.
          </div>
          <a
            href="/"
            className="deck-mono uppercase"
            style={{
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-5)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--cream-muted)',
              fontSize: 'var(--fs-meta)',
              letterSpacing: 'var(--ls-mono)',
              textDecoration: 'none',
            }}
          >
            Back to studio
          </a>
        </div>
      </div>
    );
  }

  return children;
}