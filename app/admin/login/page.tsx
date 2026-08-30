'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      // If env vars are placeholders, allow demo access notification
      if (!supabaseUrl || supabaseUrl.includes('your-supabase-id')) {
        toast.info('Supabase credentials not configured in .env.local yet.', {
          description: 'Please paste your NEXT_PUBLIC_SUPABASE_URL and ANON_KEY to enable live Auth.',
        });
        setTimeout(() => router.push('/admin'), 1500);
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Welcome back, Admin!');
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      toast.error('Authentication failed: ' + (err.message || 'Invalid credentials.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-300 mx-auto flex items-center justify-center text-black font-bold shadow-xl shadow-emerald-500/30 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">Admin Control Portal</h1>
          <p className="text-xs text-zinc-400 mt-1">Sign in with your Supabase Admin account</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 rounded-3xl border border-white/10 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-bold text-xs hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
