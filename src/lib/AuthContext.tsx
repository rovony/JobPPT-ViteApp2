import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  isLoadingPublicSettings: boolean;
  authError: any;
  appPublicSettings: any;
  authChecked: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  navigateToLogin: () => void;
  checkUserAuth: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * 2026-05-06 — bypassed user removed; site is now perimeter-gated by
   * Vercel Edge Middleware checking the `site-session` cookie. The
   * React app polls /api/auth/site-me on boot to mirror cookie state
   * into AuthContext for the route gating in App.tsx.
   *
   * Login = single shared password against SITE_PASSWORD env var.
   * Register flow is intentionally a no-op (kept exported so the
   * /register route stops short and shows a "registration disabled"
   * notice instead of crashing).
   */
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState<any>(null);

  const checkUserAuth = async () => {
    setIsLoadingAuth(true);
    try {
      const res = await fetch('/api/auth/site-me', { credentials: 'include' });
      if (res.ok) {
        const currentUser = { id: 'site-user', email: 'site@local', role: 'admin' };
        setUser(currentUser);
        setAuthError(null);
        return currentUser;
      }
      setUser(null);
      return null;
    } catch (err) {
      // Network error or endpoint missing — fail closed.
      setUser(null);
      return null;
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  /**
   * Shared-password login. Email arg is kept in the signature for
   * back-compat with the existing Login.tsx component but ignored —
   * only `password` is sent to the server.
   */
  const login = async (_email: string, password: string) => {
    setIsLoadingAuth(true);
    try {
      const res = await fetch('/api/auth/site-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Login failed');

      const currentUser = { id: 'site-user', email: 'site@local', role: 'admin' };
      setUser(currentUser);
      setAuthError(null);
    } catch (err: any) {
      setAuthError({ type: 'auth_error', message: err.message });
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  /**
   * Registration disabled (single-password site). Kept as a no-op so
   * the /register route can render a neutral "registration disabled"
   * message without throwing.
   */
  const register = async (_email: string, _password: string) => {
    setAuthError({ type: 'auth_error', message: 'Registration is disabled on this site.' });
    throw new Error('Registration is disabled on this site.');
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/site-logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      /* swallow — server may already have cleared the session */
    }
    setUser(null);
    window.location.href = '/login';
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoadingAuth,
    isLoadingPublicSettings: false,
    authError,
    appPublicSettings: { id: 'neon-db-app', public_settings: {} },
    authChecked,
    login,
    register,
    logout,
    navigateToLogin,
    checkUserAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
