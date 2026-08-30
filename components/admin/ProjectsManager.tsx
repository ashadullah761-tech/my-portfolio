'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { createClient } from '@/lib/supabase/client';
import MediaUploader from './MediaUploader';
import { Plus, Trash2, Edit, Save, X, ExternalLink, Github, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectsManagerProps {
  initialProjects: Project[];
  onRefresh: () => void;
}

export default function ProjectsManager({ initialProjects, onRefresh }: ProjectsManagerProps) {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!editingProject?.title || !editingProject?.description || !editingProject?.image_url) {
      toast.error('Please fill in title, description, and image URL.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const payload = {
        title: editingProject.title,
        description: editingProject.description,
        image_url: editingProject.image_url,
        tags: editingProject.tags || ['Next.js', 'TypeScript'],
        category: editingProject.category || 'Full Stack',
        live_url: editingProject.live_url || '',
        github_url: editingProject.github_url || '',
        featured: editingProject.featured ?? false,
      };

      if (editingProject.id) {
        const { error } = await supabase.from('projects').update(payload).eq('id', editingProject.id);
        if (error) throw error;
        toast.success('Project updated successfully!');
      } else {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw error;
        toast.success('New project added successfully!');
      }

      setEditingProject(null);
      onRefresh();
    } catch (err: any) {
      toast.error('Operation failed: ' + (err.message || 'Check database permissions.'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      toast.success('Project deleted.');
      onRefresh();
    } catch (err: any) {
      toast.error('Failed to delete: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Projects Management</h2>
          <p className="text-xs text-zinc-400">Manage, add, and publish portfolio project cards.</p>
        </div>
        <button
          onClick={() =>
            setEditingProject({
              title: '',
              description: '',
              image_url: '',
              tags: ['Next.js', 'TypeScript', 'Tailwind'],
              category: 'Full Stack',
              live_url: '',
              github_url: '',
              featured: false,
            })
          }
          className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center space-x-1 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Editor Modal / Inline Form */}
      {editingProject && (
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-emerald-400 font-heading">
              {editingProject.id ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button onClick={() => setEditingProject(null)} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Title</label>
              <input
                type="text"
                value={editingProject.title || ''}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                placeholder="Aetheria AI Studio"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
              <select
                value={editingProject.category || 'Full Stack'}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="AI/Web3">AI/Web3</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={editingProject.description || ''}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              placeholder="Full details of what this app achieves..."
              className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs resize-none"
            />
          </div>

          <MediaUploader
            value={editingProject.image_url || ''}
            onChange={(url) => setEditingProject({ ...editingProject, image_url: url })}
            label="Project Image URL"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Live URL</label>
              <input
                type="text"
                value={editingProject.live_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">GitHub URL</label>
              <input
                type="text"
                value={editingProject.github_url || ''}
                onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                placeholder="https://github.com/example/repo"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={editingProject.tags?.join(', ') || ''}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  tags: e.target.value.split(',').map((t) => t.trim()),
                })
              }
              placeholder="Next.js, Supabase, Tailwind, TypeScript"
              className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={editingProject.featured || false}
              onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
              className="rounded border-white/10 text-emerald-500 focus:ring-emerald-400"
            />
            <label htmlFor="featured" className="text-xs font-medium text-zinc-300">
              Mark as Featured Project
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              onClick={() => setEditingProject(null)}
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
              <span>{loading ? 'Saving...' : 'Save Project'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Projects List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initialProjects.map((p) => (
          <div key={p.id} className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="text-xs font-bold text-amber-400 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured</span>
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-white font-heading">{p.title}</h3>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-1 mb-3">{p.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <div className="flex space-x-3 text-zinc-400">
                {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="hover:text-emerald-400"><ExternalLink className="w-4 h-4" /></a>}
                {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="hover:text-emerald-400"><Github className="w-4 h-4" /></a>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingProject(p)}
                  className="p-2 rounded-lg glass-card text-zinc-300 hover:text-emerald-400 border border-white/10"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 rounded-lg glass-card text-red-400 hover:text-red-300 border border-white/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
