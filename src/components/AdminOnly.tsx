import { useAuth } from '@/lib/AuthContext';

/**
 * AdminOnly — renders children only when the current user is an admin.
 * Falls back to `fallback` (or null) for non-admins or unauthenticated users.
 *
 * Used to gate dev-only UI (Dev Kit menu items, the /dev catalog, etc.)
 * so audience members and regular users never see authoring tooling.
 */
export default function AdminOnly({ children, fallback = null }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || user?.role !== 'admin') return fallback;
  return children;
}

/**
 * useIsAdmin — hook form for conditional logic outside JSX.
 */
export function useIsAdmin() {
  const { user, isAuthenticated } = useAuth();
  return !!(isAuthenticated && user?.role === 'admin');
}