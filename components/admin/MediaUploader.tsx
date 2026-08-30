'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { toast } from 'sonner';

interface MediaUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function MediaUploader({ value, onChange, label = 'Upload Image' }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('portfolio-media')
        .getPublicUrl(filePath);

      onChange(urlData.publicUrl);
      toast.success('Image uploaded to Supabase storage successfully!');
    } catch (err: any) {
      toast.error('Image upload failed: ' + (err.message || 'Check storage permissions.'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">{label}</label>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload below"
          className="flex-1 px-4 py-2.5 rounded-xl glass-card bg-zinc-900/50 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
        />
        <label className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold text-xs transition-colors cursor-pointer flex items-center space-x-1.5 border border-emerald-500/30">
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>
      {value && (
        <div className="flex items-center space-x-2 text-xs text-emerald-400 mt-1 font-mono">
          <Check className="w-3.5 h-3.5" />
          <span className="truncate max-w-xs">{value}</span>
        </div>
      )}
    </div>
  );
}
