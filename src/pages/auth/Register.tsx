import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to register account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Create Account</h2>
        <p className="text-slate-400 mb-8 text-sm">Join the platform to build and manage your PharmAgent decks.</p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-950/50 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <Input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-950/50 border-slate-700 text-slate-200 focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
            <Input 
              id="confirmPassword"
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-slate-950/50 border-slate-700 text-slate-200 focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-lg shadow-violet-900/20 transition-all active:scale-[0.98] mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
            Sign in instead
          </Link>
        </div>
      </div>
    </div>
  );
}
