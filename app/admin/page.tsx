'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Project, Skill, Experience, Testimonial, Stat } from '@/types';
import {
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchTestimonials,
  fetchStats,
} from '@/lib/data';
import ProjectsManager from '@/components/admin/ProjectsManager';
import SkillsManager from '@/components/admin/SkillsManager';
import ExperienceManager from '@/components/admin/ExperienceManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import StatsManager from '@/components/admin/StatsManager';
import MessagesManager from '@/components/admin/MessagesManager';
import {
  FolderGit2,
  Cpu,
  Briefcase,
  MessageSquareQuote,
  BarChart3,
  Mail,
  LogOut,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'projects' | 'skills' | 'experience' | 'testimonials' | 'stats' | 'messages';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [projData, skillData, expData, testData, statData] = await Promise.all([
        fetchProjects(),
        fetchSkills(),
        fetchExperience(),
        fetchTestimonials(),
        fetchStats(),
      ]);

      setProjects(projData);
      setSkills(skillData);
      setExperience(expData);
      setTestimonials(testData);
      setStats(statData);
    } catch (err: any) {
      toast.error('Failed to load portfolio data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSignOut = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl && !supabaseUrl.includes('your-supabase-id')) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
      toast.success('Logged out successfully.');
      router.push('/admin/login');
    } catch (err: any) {
      toast.error('Logout error: ' + err.message);
    }
  };

  const TABS = [
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
    { id: 'skills', label: 'Skills', icon: Cpu, count: skills.length },
    { id: 'experience', label: 'Timeline', icon: Briefcase, count: experience.length },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, count: testimonials.length },
    { id: 'stats', label: 'Stats', icon: BarChart3, count: stats.length },
    { id: 'messages', label: 'Inbox', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-dark-base text-white">
      {/* Admin Topbar Header */}
      <header className="glass-nav py-4 px-6 sm:px-8 border-b border-white/10 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-300 flex items-center justify-center font-bold text-black text-lg shadow-md shadow-emerald-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold font-heading">Admin Control Center</h1>
            <p className="text-[11px] text-emerald-400">Live Supabase Database Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl glass-card text-xs font-semibold text-zinc-300 hover:text-emerald-400 border border-white/10"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-semibold transition-colors border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center space-x-2 ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'glass-card text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        {loading ? (
          <div className="text-center py-24 text-zinc-500 text-sm">Loading portfolio database...</div>
        ) : (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
            {activeTab === 'projects' && (
              <ProjectsManager initialProjects={projects} onRefresh={loadData} />
            )}
            {activeTab === 'skills' && (
              <SkillsManager initialSkills={skills} onRefresh={loadData} />
            )}
            {activeTab === 'experience' && (
              <ExperienceManager initialExperience={experience} onRefresh={loadData} />
            )}
            {activeTab === 'testimonials' && (
              <TestimonialsManager initialTestimonials={testimonials} onRefresh={loadData} />
            )}
            {activeTab === 'stats' && (
              <StatsManager initialStats={stats} onRefresh={loadData} />
            )}
            {activeTab === 'messages' && <MessagesManager />}
          </div>
        )}
      </div>
    </div>
  );
}
