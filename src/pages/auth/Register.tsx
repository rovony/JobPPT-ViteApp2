import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Registration is disabled — this site uses a single shared password
 * (see /login). Page kept so the existing /register route doesn't 404
 * if someone deep-linked it.
 */
export default function Register() {
  return (
    <div
      data-testid="register-disabled-page"
      className="min-h-screen flex items-center justify-center bg-slate-950 p-4"
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl text-center">
        <h2 className="text-2xl font-semibold text-slate-100 mb-3">Registration disabled</h2>
        <p className="text-slate-400 mb-6 text-sm">
          This site uses a single shared password — there's nothing to sign up for.
          If you have the password, head to the login page.
        </p>
        <Link to="/login">
          <Button className="bg-cyan-600 hover:bg-cyan-500 text-white">
            Go to login
          </Button>
        </Link>
      </div>
    </div>
  );
}
