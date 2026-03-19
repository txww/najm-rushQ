import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

// Force dynamic rendering since we need fresh data from API
export const dynamic = 'force-dynamic';

// Fetch projects directly from Strapi (server-side, no HTTP round-trip)
async function getProjects() {
  try {
    const { getProjects: fetchProjects } = await import('@/lib/strapi');
    const apiProjects = await fetchProjects();
    return apiProjects.map((project) => ({
      id: project.id,
      title: project.title,
      location: project.location,
      year: project.year,
      image: project.image,
      summary: project.summary,
      details: {
        features: project.features ? project.features.split(',') : [],
        area: project.area,
        floors: project.floors,
        status: project.status,
        client: project.client,
      },
      mapLocation: project.mapLocation,
      testimonials: project.testimonials || [],
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return projects; // Fallback to static data
  }
}

export const metadata = {
  title: 'مشاريعنا | نجم راش للمقاولات',
  description:
    'استعرض مشاريعنا المنجزة في المقاولات والتطوير الإنشائي. أكثر من 150 مشروعاً منجزاً بأعلى معايير الجودة.',
  keywords: ['مشاريع', 'مقاولات', 'منجز', 'جودة', 'بناء', 'تشطيب'],
  openGraph: {
    title: 'مشاريع شركة نجم راش المنجزة',
    description: 'أكثر من 150 مشروعاً منجزاً في المقاولات',
    images: ['/images/projects-hero.jpg'],
    url: '/projects',
  },
};

export default async function ProjectsPage() {
  const projectsData = await getProjects();

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-white grid grid-cols-1 lg:grid-cols-2 gap-14 font-[var(--arabic-font)]">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center text-right space-y-6">
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-full w-fit ml-auto font-semibold shadow-lg hover:scale-105 hover:brightness-105 transition-transform">
            مشاريعنا
          </button>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl">
            نبني المستقبل
            <br />
            بأعلى معايير الجودة
          </h1>

          <p className="text-lg leading-relaxed opacity-95 text-gray-200">
            نقدم حلولًا متكاملة في عالم المقاولات والبناء، مع فريق هندسي محترف
            يضمن لك تنفيذ مشاريعك بدقة وجودة عالية، وبأسلوب يواكب تطلعاتك.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-5 mt-4">
            {[
              { num: '+150', title: 'مشروع منجز' },
              { num: '+25', title: 'سنوات خبرة' },
              { num: '+200', title: 'موظف محترف' },
              { num: '98%', title: 'رضا العملاء' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center border border-white/10 shadow-xl hover:bg-white/20 hover:scale-105 transition"
              >
                <p className="text-[var(--secondary-color)] text-4xl font-bold drop-shadow">
                  {item.num}
                </p>
                <p className="mt-2 text-gray-200">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="hover:scale-105 transition-transform"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
