import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import {
  fetchStats,
  fetchSkills,
  fetchProjects,
  fetchExperience,
  fetchTestimonials,
} from '@/lib/data';

export const revalidate = 3600; // Revalidate every hour to keep data fresh but load instantly

// Server rendered page fetching dynamic Supabase records with robust fallback
export default async function HomePage() {
  const [stats, skills, projects, experience, testimonials] = await Promise.all([
    fetchStats(),
    fetchSkills(),
    fetchProjects(),
    fetchExperience(),
    fetchTestimonials(),
  ]);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection stats={stats} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experience={experience} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
      <Footer />
    </main>
  );
}
