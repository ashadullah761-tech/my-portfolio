'use client';

import { useState } from 'react';
import { Experience } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit, Save, X, Briefcase, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

interface ExperienceManagerProps {
  initialExperience: Experience[];
  onRefresh: () => void;
}

export default function ExperienceManager({ initialExperience, onRefresh }: ExperienceManagerProps) {
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!editingExp?.role || !editingExp?.company) {
      toast.error('Role and Company are required.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const payload = {
        role: editingExp.role,
        company: editingExp.company,
        description: editingExp.description || '',
        start_date: editingExp.start_date || '2022',
        end_date: editingExp.end_date || 'Present',
        type: editingExp.type || 'work',
      };

      if (editingExp.id) {
        const { error } = await supabase.from('experience').update(payload).eq('id', editingExp.id);
        if (error) throw error;
        toast.success('Experience record updated!');
      } else {
        const { error } = await supabase.from('experience').insert([payload]);
        if (error) throw error;
        toast.success('Experience record added!');
      }

      setEditingExp(null);
      onRefresh();
    } catch (err: any) {
      toast.error('Save failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this record?')) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('experience').delete().eq('id', id);
      if (error) throw error;
      toast.success('Record deleted.');
      onRefresh();
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Experience &amp; Education Timeline</h2>
          <p className="text-xs text-zinc-400">Manage work history, company roles, and degrees.</p>
        </div>
        <button
          onClick={() =>
            setEditingExp({
              role: '',
              company: '',
              description: '',
              start_date: '2023',
              end_date: 'Present',
              type: 'work',
            })
          }
          className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center space-x-1 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {editingExp && (
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-sm font-bold text-emerald-400 font-heading">
              {editingExp.id ? 'Edit Record' : 'Add New Record'}
            </h3>
            <button onClick={() => setEditingExp(null)} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Role / Degree Title</label>
              <input
                type="text"
                value={editingExp.role || ''}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                placeholder="Senior Full Stack Engineer"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Company / Institution</label>
              <input
                type="text"
                value={editingExp.company || ''}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                placeholder="Nexus Tech Labs"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Start Date / Year</label>
              <input
                type="text"
                value={editingExp.start_date || ''}
                onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                placeholder="2021"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">End Date / Year</label>
              <input
                type="text"
                value={editingExp.end_date || ''}
                onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                placeholder="Present"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Type</label>
              <select
                value={editingExp.type || 'work'}
                onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value as 'work' | 'education' })}
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              >
                <option value="work">Work Experience</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Description / Key Achievements</label>
            <textarea
              rows={3}
              value={editingExp.description || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
              placeholder="Summary of responsibilities and achievements..."
              className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              onClick={() => setEditingExp(null)}
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
              <span>{loading ? 'Saving...' : 'Save Record'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {initialExperience.map((exp) => (
          <div key={exp.id} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-1">
                {exp.type === 'work' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-heading">{exp.role}</h4>
                <p className="text-xs text-emerald-400">{exp.company} &bull; {exp.start_date} - {exp.end_date}</p>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{exp.description}</p>
              </div>
            </div>

            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => setEditingExp(exp)}
                className="p-2 rounded-lg glass-card text-zinc-300 hover:text-emerald-400"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg glass-card text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
