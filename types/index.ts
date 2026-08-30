export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[];
  live_url?: string | null;
  github_url?: string | null;
  category: string;
  featured: boolean;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  proficiency: number;
  category: string;
  created_at?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  description: string;
  start_date: string;
  end_date: string;
  type: 'work' | 'education';
  created_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  avatar_url: string;
  rating: number;
  created_at?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
