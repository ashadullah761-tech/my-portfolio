'use client';

import { useState } from 'react';
import { Testimonial } from '@/types';
import { createClient } from '@/lib/supabase/client';
import MediaUploader from './MediaUploader';
import { Plus, Trash2, Edit, Save, X, Star } from 'lucide-react';
import { toast } from 'sonner';

interface TestimonialsManagerProps {
  initialTestimonials: Testimonial[];
  onRefresh: () => void;
}

export default function TestimonialsManager({ initialTestimonials, onRefresh }: TestimonialsManagerProps) {
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!editingTestimonial?.name || !editingTestimonial?.message) {
      toast.error('Name and message are required.');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const payload = {
        name: editingTestimonial.name,
        role: editingTestimonial.role || 'Client',
        company: editingTestimonial.company || 'Company',
        message: editingTestimonial.message,
        avatar_url: editingTestimonial.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
        rating: editingTestimonial.rating || 5,
      };

      if (editingTestimonial.id) {
        const { error } = await supabase.from('testimonials').update(payload).eq('id', editingTestimonial.id);
        if (error) throw error;
        toast.success('Testimonial updated!');
      } else {
        const { error } = await supabase.from('testimonials').insert([payload]);
        if (error) throw error;
        toast.success('Testimonial added!');
      }

      setEditingTestimonial(null);
      onRefresh();
    } catch (err: any) {
      toast.error('Save failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const supabase = createClient();
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      toast.success('Testimonial deleted.');
      onRefresh();
    } catch (err: any) {
      toast.error('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-heading text-white">Client Testimonials</h2>
          <p className="text-xs text-zinc-400">Manage client reviews, quotes, and avatars.</p>
        </div>
        <button
          onClick={() =>
            setEditingTestimonial({
              name: '',
              role: 'VP of Product',
              company: 'Tech Corp',
              message: '',
              avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
              rating: 5,
            })
          }
          className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center space-x-1 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {editingTestimonial && (
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/40 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-sm font-bold text-emerald-400 font-heading">
              {editingTestimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>
            <button onClick={() => setEditingTestimonial(null)} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Client Name</label>
              <input
                type="text"
                value={editingTestimonial.name || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                placeholder="Sarah Jenkins"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Role</label>
              <input
                type="text"
                value={editingTestimonial.role || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                placeholder="VP of Engineering"
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Company</label>
              <input
                type="text"
                value={editingTestimonial.company || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                placeholder="Acme Inc."
                className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <MediaUploader
            value={editingTestimonial.avatar_url || ''}
            onChange={(url) => setEditingTestimonial({ ...editingTestimonial, avatar_url: url })}
            label="Avatar Photo URL"
          />

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Rating (1 to 5 Stars)</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: star })}
                  className={`p-1.5 rounded-lg ${
                    (editingTestimonial.rating || 5) >= star ? 'text-amber-400' : 'text-zinc-600'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Testimonial Quote Message</label>
            <textarea
              rows={3}
              value={editingTestimonial.message || ''}
              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, message: e.target.value })}
              placeholder="What the client said about your work..."
              className="w-full px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              onClick={() => setEditingTestimonial(null)}
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
              <span>{loading ? 'Saving...' : 'Save Testimonial'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {initialTestimonials.map((item) => (
          <div key={item.id} className="glass-card p-4 rounded-xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-white font-heading">{item.name}</h4>
                <div className="flex text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-emerald-400 font-medium">{item.role} &bull; {item.company}</p>
              <p className="text-xs text-zinc-400 italic mt-2 line-clamp-3">&ldquo;{item.message}&rdquo;</p>
            </div>

            <div className="flex justify-end space-x-2 pt-3 mt-3 border-t border-white/10">
              <button
                onClick={() => setEditingTestimonial(item)}
                className="p-1.5 rounded-lg glass-card text-zinc-300 hover:text-emerald-400"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
