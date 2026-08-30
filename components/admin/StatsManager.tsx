'use client';

import { useState } from 'react';
import { Stat } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface StatsManagerProps {
  initialStats: Stat[];
  onRefresh: () => void;
}

export default function StatsManager({ initialStats, onRefresh }: StatsManagerProps) {
  const [editingStat, setEditingStat] = useState<Partial<Stat> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!editingStat?.label || !editingStat?.value) {
      toast.error('Label and Value are required.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const payload = {
        label: editingStat.label,
        value: editingStat.value,
      };

      if (editingStat.id) {
        const { error } = await supabase.from('stats').update(payload).eq('id', editingStat.id);
        if (error) throw error;
        toast.success('Stat counter updated!');
      } else {
        const { error } = await supabase.from('stats').insert([payload]);
        if (error) throw error;
        toast.success('New stat added!');
      }

      setEditingStat(null);
      onRefresh();
    } catch (err: any) {
      toast.error('Save failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this stat counter?')) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('stats').delete().eq('id', id);
      if (error) throw error;
      toast.success('Stat deleted.');
      onRefresh();
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Highlight Statistics</h2>
          <p className="text-xs text-zinc-400">Manage years experience, projects completed, and metrics.</p>
        </div>
        <button
          onClick={() =>
            setEditingStat({
              label: '',
              value: '',
            })
          }
          className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center space-x-1 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Metric</span>
        </button>
      </div>

      {editingStat && (
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-sm font-bold text-emerald-400 font-heading">
              {editingStat.id ? 'Edit Metric' : 'Add New Metric'}
            </h3>
            <button onClick={() => setEditingStat(null)} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Display Label</label>
              <input
                type="text"
                value={editingStat.label || ''}
                onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                placeholder="Projects Completed"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Value</label>
              <input
                type="text"
                value={editingStat.value || ''}
                onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })}
                placeholder="40+"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              onClick={() => setEditingStat(null)}
              className="px-4 py-2 rounded-xl glass-card text-zinc-400 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center space-x-1 hover:bg-emerald-400 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Metric'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {initialStats.map((stat) => (
          <div key={stat.id} className="glass-card p-4 rounded-xl border border-white/10 text-center relative group">
            <p className="text-2xl font-extrabold font-heading text-emerald-400">{stat.value}</p>
            <p className="text-xs text-zinc-400 mt-1 font-medium">{stat.label}</p>

            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditingStat(stat)}
                className="p-1 rounded glass-card text-zinc-300 hover:text-emerald-400"
              >
                <Edit className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(stat.id)}
                className="p-1 rounded glass-card text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
