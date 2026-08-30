'use client';

import { useState } from 'react';
import { Skill } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface SkillsManagerProps {
  initialSkills: Skill[];
  onRefresh: () => void;
}

export default function SkillsManager({ initialSkills, onRefresh }: SkillsManagerProps) {
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!editingSkill?.name) {
      toast.error('Skill name is required');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const payload = {
        name: editingSkill.name,
        icon: editingSkill.icon || 'Code',
        proficiency: editingSkill.proficiency ?? 85,
        category: editingSkill.category || 'Frontend',
      };

      if (editingSkill.id) {
        const { error } = await supabase.from('skills').update(payload).eq('id', editingSkill.id);
        if (error) throw error;
        toast.success('Skill updated!');
      } else {
        const { error } = await supabase.from('skills').insert([payload]);
        if (error) throw error;
        toast.success('New skill added!');
      }

      setEditingSkill(null);
      onRefresh();
    } catch (err: any) {
      toast.error('Operation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      toast.success('Skill deleted.');
      onRefresh();
    } catch (err: any) {
      toast.error('Failed to delete: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Skills &amp; Tech Stack</h2>
          <p className="text-xs text-zinc-400">Manage icons, proficiency levels, and categories.</p>
        </div>
        <button
          onClick={() =>
            setEditingSkill({
              name: '',
              icon: 'Code',
              proficiency: 90,
              category: 'Frontend',
            })
          }
          className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center space-x-1 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {editingSkill && (
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-sm font-bold text-emerald-400 font-heading">
              {editingSkill.id ? 'Edit Skill' : 'Create New Skill'}
            </h3>
            <button onClick={() => setEditingSkill(null)} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Skill Name</label>
              <input
                type="text"
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                placeholder="React / Next.js"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
              <select
                value={editingSkill.category || 'Frontend'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Languages">Languages</option>
                <option value="DevOps">DevOps</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Icon Name (Lucide React)</label>
              <select
                value={editingSkill.icon || 'Code'}
                onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              >
                <option value="Code">Code</option>
                <option value="FileCode">FileCode</option>
                <option value="Palette">Palette</option>
                <option value="Server">Server</option>
                <option value="Database">Database</option>
                <option value="Sparkles">Sparkles</option>
                <option value="Globe">Globe</option>
                <option value="Box">Box</option>
                <option value="Cpu">Cpu</option>
                <option value="Layers">Layers</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Proficiency ({editingSkill.proficiency}%)</label>
              <input
                type="range"
                min="10"
                max="100"
                value={editingSkill.proficiency ?? 85}
                onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) })}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 mt-2"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              onClick={() => setEditingSkill(null)}
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
              <span>{loading ? 'Saving...' : 'Save Skill'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {initialSkills.map((skill) => (
          <div key={skill.id} className="glass-card p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white font-heading">{skill.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {skill.proficiency}%
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{skill.category}</p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setEditingSkill(skill)}
                className="p-1.5 rounded-lg glass-card text-zinc-300 hover:text-emerald-400"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1.5 rounded-lg glass-card text-red-400 hover:text-red-300"
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
