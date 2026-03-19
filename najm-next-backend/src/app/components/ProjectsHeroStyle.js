'use client';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import { useState, useEffect } from 'react';

export default function ProjectsHeroStyle() {
  const [projectsData, setProjectsData] = useState(projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const apiProjects = await res.json();

          // Transform API data to match the expected format
          const transformedProjects = apiProjects.map((project) => ({
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

          setProjectsData(transformedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Keep using static data as fallback
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="pt-20 pb-24">
        <div className="container mx-auto px-6">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
            <div className="p-12 md:p-20 text-center">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-700 rounded mb-4 mx-auto w-64"></div>
                <div className="h-4 bg-gray-700 rounded mb-8 mx-auto w-96"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-24">
      <div className="container mx-auto px-6">
        <div
          className="rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(11,18,32,0.35), rgba(11,18,32,0.35)),
              linear-gradient(90deg, rgba(194,138,23,0.12), rgba(0,0,0,0)),
              url('/images/projects-hero.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--brand-gold,#C28A17)] drop-shadow-md mb-6">
              مشاريعنا
            </h2>

            <p className="max-w-3xl mx-auto text-lg text-white/90 leading-relaxed mb-14">
              مجموعة مختارة من مشاريعنا المنفّذة بإتقان، التزام، وتفاصيل دقيقة.
            </p>

            {/* Cards Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {projectsData.slice(0, 4).map((prj) => (
                <ProjectCard key={prj.id} project={prj} />
              ))}
            </div>

            <Link
              href="/projects"
              className="inline-block bg-[var(--brand-gold,#C28A17)] px-10 py-4 rounded-full text-black font-bold text-lg shadow-xl hover:bg-[#d9a233] transition"
            >
              عرض كل المشاريع
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
