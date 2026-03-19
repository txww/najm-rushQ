'use client';
import Link from 'next/link';
import { HiOutlineLocationMarker } from 'react-icons/hi';

export default function ProjectCard({ project }) {
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '123456789';

  return (
    <article
      className="relative bg-white dark:bg-[#0B1220] rounded-2xl overflow-hidden 
                        shadow-lg hover:shadow-2xl transition-all duration-300 border border-black/5 
                        flex flex-col hover:-translate-y-1"
    >
      {/* صورة المشروع */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />

        {/* الموقع */}
        <div
          className="absolute left-3 top-3 bg-black/55 backdrop-blur-sm text-white 
                        rounded-full px-3 py-1 text-xs font-medium flex items-center gap-2 shadow-md"
        >
          <HiOutlineLocationMarker className="text-sm" />
          <span>{project.location}</span>
        </div>

        {/* السنة */}
        <div
          className="absolute right-3 top-3 bg-white/15 backdrop-blur-sm text-white 
                        rounded-full px-3 py-1 text-xs font-medium shadow-md"
        >
          {project.year}
        </div>
      </div>

      {/* نص البطاقة */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-extrabold text-[var(--brand-gold,#C28A17)] mb-2 leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-[#0B1A2B] dark:text-white/80 leading-relaxed mb-4 line-clamp-3">
          {project.summary}
        </p>

        {/* الأزرار */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg 
                       bg-[var(--brand-gold,#C28A17)] text-black font-semibold text-sm shadow-sm 
                       hover:brightness-95 transition"
          >
            عرض المشروع
          </Link>

          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent(`أرغب بمعلومات عن المشروع: ${project.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 rounded-lg border border-white/20 
                       bg-white/5 dark:text-white text-sm hover:bg-white/10 transition"
          >
            واتساب
          </a>
        </div>
      </div>
    </article>
  );
}
