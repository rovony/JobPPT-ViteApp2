/**
 * STANDALONE / OFFLINE AUTH STUB.
 *
 * Short-circuits the base44 auth flow so the deck boots without a
 * backend. The provider immediately reports "logged in, no error, no
 * loading" so routes render without the spinner or login redirect.
 *
 * Swap this file out (git checkout -- src/lib/AuthContext.jsx) if/when
 * reconnecting to a real base44 backend.
 */
import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

const LOCAL_USER = {
  id: 'local-user',
  full_name: 'Malek Okour (local)',
  email: 'local@standalone',
  role: 'admin',
};

export const AuthProvider = ({ children }) => {
  const value = {
    user: LOCAL_USER,
    isAuthenticated: true,
    isLoadingAuth: false,
    isLoadingPublicSettings: false,
    authError: null,
    appPublicSettings: { id: 'local-dev-standalone', public_settings: {} },
    authChecked: true,
    logout: () => null,
    navigateToLogin: () => null,
    checkUserAuth: async () => LOCAL_USER,
    checkAppState: async () => null,
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
