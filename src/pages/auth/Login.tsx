import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h2>
        <p className="text-slate-400 mb-8 text-sm">Sign in to access your presentation decks and analytics.</p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-950/50 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Link to="/forgot-password" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</Link>
            </div>
            <Input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-950/50 border-slate-700 text-slate-200 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-900/20 transition-all active:scale-[0.98]"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
