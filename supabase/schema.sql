-- ==========================================================
-- PREMIUM PORTFOLIO DATABASE SCHEMA & RLS POLICIES
-- Run this script in your Supabase Project SQL Editor
-- ==========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------
-- 1. PROJECTS TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    category TEXT NOT NULL DEFAULT 'Full Stack',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 2. SKILLS TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    proficiency INT NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
    category TEXT NOT NULL DEFAULT 'Frontend',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 3. EXPERIENCE TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT DEFAULT 'Present',
    type TEXT NOT NULL DEFAULT 'work' CHECK (type IN ('work', 'education')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 4. TESTIMONIALS TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    message TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 5. STATS TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ----------------------------------------------------------
-- 6. CONTACT MESSAGES TABLE
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================

-- Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
DROP POLICY IF EXISTS "Admin full control projects" ON public.projects;

DROP POLICY IF EXISTS "Public read skills" ON public.skills;
DROP POLICY IF EXISTS "Admin full control skills" ON public.skills;

DROP POLICY IF EXISTS "Public read experience" ON public.experience;
DROP POLICY IF EXISTS "Admin full control experience" ON public.experience;

DROP POLICY IF EXISTS "Public read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin full control testimonials" ON public.testimonials;

DROP POLICY IF EXISTS "Public read stats" ON public.stats;
DROP POLICY IF EXISTS "Admin full control stats" ON public.stats;

DROP POLICY IF EXISTS "Public insert contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin full control contact_messages" ON public.contact_messages;

-- PROJECTS Policies
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin full control projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- SKILLS Policies
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin full control skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- EXPERIENCE Policies
CREATE POLICY "Public read experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Admin full control experience" ON public.experience FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- TESTIMONIALS Policies
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin full control testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- STATS Policies
CREATE POLICY "Public read stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Admin full control stats" ON public.stats FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- CONTACT MESSAGES Policies
CREATE POLICY "Public insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full control contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ==========================================================
-- SUPABASE STORAGE BUCKET SETUP
-- ==========================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public read portfolio-media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Admin upload portfolio-media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');
CREATE POLICY "Admin update portfolio-media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media');
CREATE POLICY "Admin delete portfolio-media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');

-- ==========================================================
-- INITIAL DEMO DATA (OPTIONAL SEED DATA)
-- ==========================================================

INSERT INTO public.stats (label, value) VALUES
('Years Experience', '5+'),
('Projects Completed', '40+'),
('Happy Clients', '25+'),
('Code Commits', '2.5k+')
ON CONFLICT DO NOTHING;

INSERT INTO public.skills (name, icon, proficiency, category) VALUES
('React / Next.js', 'Code', 95, 'Frontend'),
('TypeScript', 'FileCode', 90, 'Languages'),
('Tailwind CSS', 'Palette', 95, 'Frontend'),
('Node.js & Express', 'Server', 85, 'Backend'),
('Supabase & PostgreSQL', 'Database', 88, 'Backend'),
('Framer Motion', 'Sparkles', 90, 'Frontend'),
('GraphQL / REST APIs', 'Globe', 85, 'Backend'),
('Docker & CI/CD', 'Box', 80, 'DevOps')
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, image_url, tags, live_url, github_url, category, featured) VALUES
(
    'Marudhar Export - Global Export & Trading Platform',
    'Corporate global export & trading portal engineered for Durg Singh (Marudhar Export). Features premium catalog navigation, international quotation inquiries, responsive dark/light UI, and lightning-fast SEO optimization.',
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    ARRAY['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'SEO Architecture'],
    'https://www.marudharexport.com',
    'https://github.com',
    'Full Stack',
    true
),
(
    'Aetheria - AI Creative Studio',
    'A next-generation AI image and video synthesis suite featuring multi-model orchestration, real-time web socket previews, and team collaboration canvas.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Next.js 14', 'TypeScript', 'Tailwind', 'Supabase', 'Framer Motion'],
    'https://example.com',
    'https://github.com',
    'Full Stack',
    true
),
(
    'Luminary - Web3 SaaS Dashboard',
    'High-frequency trading analytics terminal for decentralized exchanges with dynamic WebSocket charts, portfolio tracking, and automated bot triggers.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Web3.js', 'Recharts'],
    'https://example.com',
    'https://github.com',
    'Frontend',
    true
),
(
    'Velox - E-Commerce Engine',
    'Sub-second headless e-commerce store built with Next.js App Router, Stripe checkout, Supabase vector search for product recommendations, and Redis cache.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Next.js', 'Stripe', 'Supabase', 'Tailwind', 'Zustand'],
    'https://example.com',
    'https://github.com',
    'Full Stack',
    false
)
ON CONFLICT DO NOTHING;

INSERT INTO public.experience (role, company, description, start_date, end_date, type) VALUES
('Senior Full Stack Engineer', 'Nexus Tech Labs', 'Architected enterprise web apps, led frontend migration to Next.js App Router, improved Core Web Vitals by 40%.', '2023', 'Present', 'work'),
('Lead Frontend Developer', 'Aura Design Studio', 'Built award-winning interactive marketing sites, micro-interactions with Framer Motion, and design systems.', '2021', '2023', 'work'),
('Full Stack Developer', 'Vanguard Digital', 'Developed REST & GraphQL microservices, PostgreSQL databases, and React web applications.', '2019', '2021', 'work'),
('B.S. Computer Science', 'Tech University', 'Specialized in Software Engineering, Distributed Systems, and Human-Computer Interaction.', '2015', '2019', 'education')
ON CONFLICT DO NOTHING;

INSERT INTO public.testimonials (name, role, company, message, avatar_url, rating) VALUES
(
    'Durg Singh',
    'Founder & Managing Director',
    'Marudhar Export (marudharexport.com)',
    'Ashadullah developed our official website www.marudharexport.com with outstanding design, smooth responsiveness, and great performance. His technical expertise and commitment to quality are exceptional!',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    5
),
(
    'Sarah Jenkins',
    'VP of Product',
    'Nexus Global',
    'Ashadullah delivered our flagship platform ahead of deadline with unmatched visual excellence and technical precision. The interactive animations wowed our investors!',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    5
),
(
    'Marcus Thorne',
    'Founder & CEO',
    'Aetheria AI',
    'Working with Ashadullah transformed our product UX completely. The code quality, speed, and attention to micro-interactions set a new gold standard for our engineering team.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    5
)
ON CONFLICT DO NOTHING;
