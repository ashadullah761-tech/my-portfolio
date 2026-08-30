'use client';

import { useState, useEffect, useCallback } from 'react';
import { ContactMessage } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { Mail, CheckCircle, Trash2, Clock, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes('your-supabase-id')) {
        setMessages([
          {
            id: '1',
            name: 'Sarah Jenkins',
            email: 'sarah@nexus.com',
            subject: 'Project Inquiry - Enterprise Next.js App',
            message: 'Hi Alex, we loved your work on Luminary. We would like to hire you for a 3-month contract building our new AI analytics portal.',
            is_read: false,
            created_at: new Date().toISOString(),
          },
        ]);
        return;
      }
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages((data as ContactMessage[]) || []);
    } catch (err: any) {
      toast.error('Failed to load messages: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const toggleReadStatus = async (msg: ContactMessage) => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && !supabaseUrl.includes('your-supabase-id')) {
        const supabase = createClient();
        const { error } = await supabase
          .from('contact_messages')
          .update({ is_read: !msg.is_read })
          .eq('id', msg.id);
        if (error) throw error;
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m))
      );
      toast.success(msg.is_read ? 'Marked as unread' : 'Marked as read');
    } catch (err: any) {
      toast.error('Failed: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && !supabaseUrl.includes('your-supabase-id')) {
        const supabase = createClient();
        const { error } = await supabase.from('contact_messages').delete().eq('id', id);
        if (error) throw error;
      }
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Message deleted.');
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Contact Form Inbox</h2>
          <p className="text-xs text-zinc-400">View incoming messages sent from the public website.</p>
        </div>
        <button
          onClick={loadMessages}
          className="px-4 py-2 rounded-xl glass-card text-zinc-300 hover:text-emerald-400 text-xs border border-white/10"
        >
          Refresh Inbox
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-zinc-500 text-sm">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-2xl border border-white/10 text-zinc-400">
          <MessageSquare className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
          <p className="text-sm font-medium">No messages in inbox yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-card p-6 rounded-2xl border transition-all ${
                msg.is_read
                  ? 'border-white/10 opacity-75'
                  : 'border-emerald-500/40 bg-emerald-500/5'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white font-heading">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-xs text-emerald-400 hover:underline">
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs text-zinc-500 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(msg.created_at || Date.now()).toLocaleDateString()}</span>
                  </span>

                  <button
                    onClick={() => toggleReadStatus(msg)}
                    className={`p-2 rounded-lg glass-card border border-white/10 text-xs flex items-center space-x-1 ${
                      msg.is_read ? 'text-zinc-400 hover:text-white' : 'text-emerald-400 font-semibold'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{msg.is_read ? 'Mark Unread' : 'Read'}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-lg glass-card text-red-400 hover:text-red-300 border border-white/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-xs font-bold text-zinc-300 mb-1">Subject: {msg.subject}</p>
                <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
