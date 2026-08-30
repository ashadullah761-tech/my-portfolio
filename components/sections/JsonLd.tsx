export default function JsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ashadullah',
    url: 'https://ashadullah.dev',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    sameAs: [
      'https://github.com',
      'https://linkedin.com',
      'https://twitter.com',
    ],
    jobTitle: 'Senior Full Stack Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance & Contracting',
    },
    description: 'Expert Full Stack Architect & UI/UX Developer specializing in Next.js, Supabase, TypeScript, and Framer Motion.',
    knowsAbout: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'GraphQL'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
