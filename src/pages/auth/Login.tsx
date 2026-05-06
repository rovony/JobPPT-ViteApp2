import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * Single-password gate. The site uses a shared SITE_PASSWORD env var;
 * each interviewer / viewer is given the same password out-of-band.
 * After login, redirects to ?next=<path> if present, else home.
 */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/';
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login('', password);
      // After successful login the cookie is set; navigate to the
      // requested next path. Use window.location so the page reloads
      // through middleware (gives the gate a chance to verify) instead
      // of a client-side route swap.
      window.location.href = next;
    } catch (err: any) {
      setError(err.message || 'Incorrect password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="login-page"
      className="min-h-screen flex items-center justify-center bg-slate-950 p-4"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <h2 className="text-3xl font-bold text-slate-100 mb-2">Restricted access</h2>
        <p className="text-slate-400 mb-8 text-sm">
          Enter the site password to continue. Sharing a deck via a link?
          You don't need to log in — just open the link.
        </p>

        {error && (
          <div
            data-testid="login-error"
            role="alert"
            className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Site password
            </Label>
            <Input
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="bg-slate-950/50 border-slate-700 text-slate-200 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>

          <Button
            type="submit"
            data-testid="login-submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-900/20 transition-all active:scale-[0.98]"
          >
            {loading ? 'Checking…' : 'Enter'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Looking for a specific deck? Use the share link the host sent you.
        </p>
      </div>
    </div>
  );
}
