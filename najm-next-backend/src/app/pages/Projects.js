// src/pages/Projects.jsx
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { useState, useMemo } from 'react';

export default function Projects() {
  const [q, setQ] = useState('');
  const norm = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!norm) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(norm) ||
        (p.summary || '').toLowerCase().includes(norm) ||
        (p.location || '').toLowerCase().includes(norm)
    );
  }, [norm]);

  return (
    <section className="bg-[var(--brand-bg,#0B1220)] py-20">
      <div className="container px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--brand-gold,#C28A17)] mb-4 tracking-tight">
            مشاريعنا
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            نماذج من أعمالنا المنفّذة: الجودة، الالتزام والمواعيد.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن مشروع أو موقع..."
            className="w-full p-3 rounded-lg bg-white/6 text-white placeholder-gray-300 border border-white/10 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prj) => (
            <ProjectCard key={prj.id} project={prj} />
          ))}
        </div>
      </div>
    </section>
  );
}
