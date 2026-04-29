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
  const [user, setUser] = useState<User | null>({ id: 'local-user', email: 'admin@merck.com', role: 'admin' });
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(true);
  const [authError, setAuthError] = useState<any>(null);

  const checkUserAuth = async () => {
    // TEMPORARILY BYPASSED FOR LOCAL DEV
    const currentUser = { id: 'local-user', email: 'admin@merck.com', role: 'admin' };
    setUser(currentUser);
    setIsLoadingAuth(false);
    setAuthChecked(true);
    return currentUser;
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoadingAuth(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
      setAuthError(null);
    } catch (err: any) {
      setAuthError({ type: 'auth_error', message: err.message });
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const register = async (email, password) => {
    setIsLoadingAuth(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      // Auto login after register
      await login(email, password);
    } catch (err: any) {
      setAuthError({ type: 'auth_error', message: err.message });
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
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
