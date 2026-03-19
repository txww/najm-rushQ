import Link from 'next/link';
import { projects } from '../../data/projects';
import { HiOutlineLocationMarker } from 'react-icons/hi';

// Force dynamic rendering since we need fresh data from API
export const dynamic = 'force-dynamic';

// Fetch project directly from Strapi (server-side, no HTTP round-trip)
async function getProject(id) {
  try {
    const { getProject: fetchProject } = await import('@/lib/strapi');
    const apiProject = await fetchProject(id);
    if (!apiProject) return projects.find((p) => String(p.id) === String(id));
    return {
      id: apiProject.id,
      title: apiProject.title,
      location: apiProject.location,
      year: apiProject.year,
      image: apiProject.image,
      summary: apiProject.summary,
      details: {
        features: apiProject.features ? apiProject.features.split(',') : [],
        area: apiProject.area,
        floors: apiProject.floors,
        status: apiProject.status,
        client: apiProject.client,
      },
      mapLocation: apiProject.mapLocation,
      testimonials: apiProject.testimonials || [],
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return projects.find((p) => String(p.id) === String(id));
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: 'المشروع غير موجود | نجم راش',
    };
  }

  return {
    title: `${project.title} | مشاريع نجم راش`,
    description: project.summary,
    keywords: ['مشروع', project.title, 'مقاولات', 'نجم راش'],
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.image],
      url: `/projects/${id}`,
    },
  };
}

export default async function ProjectDetails({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="text-center py-10 text-red-500 text-lg font-semibold">
        المشروع غير موجود
      </div>
    );
  }

  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+963984966818';

  return (
    <section className="max-w-5xl mx-auto p-6 md:p-10">
      <Link
        href="/projects"
        className="inline-block mb-6 text-sm text-[var(--brand-gold,#C28A17)] hover:underline transition"
      >
        ← العودة إلى المشاريع
      </Link>

      <div className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-slate-900 transition hover:shadow-2xl">
        {/* صورة المشروع */}
        <div className="h-72 md:h-96 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* محتوى المشروع */}
        <div className="p-6 md:p-8 flex flex-col gap-6 text-gray-800 dark:text-gray-200">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--brand-gold,#C28A17)]">
            {project.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:gap-6 text-sm text-gray-600 dark:text-white/70">
            <span className="flex items-center gap-1">
              <HiOutlineLocationMarker className="text-[var(--brand-gold,#C28A17)]" />
              {project.location}
            </span>
            <span>سنة الإنجاز: {project.year}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.summary}
          </p>

          {/* تفاصيل المشروع */}
          {project.details && (
            <div className="space-y-2 text-base md:text-lg text-gray-800 dark:text-gray-200">
              <p>
                <strong>المساحة:</strong> {project.details.area}
              </p>
              <p>
                <strong>عدد الطوابق:</strong> {project.details.floors}
              </p>
              <p>
                <strong>الحالة:</strong> {project.details.status}
              </p>
              <p>
                <strong>العميل:</strong> {project.details.client}
              </p>
              <div>
                <strong>المميزات:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {project.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* خريطة المشروع */}
          {project.mapLocation && (
            <div className="mt-6">
              <h2 className="text-lg md:text-xl font-bold mb-2">
                موقع المشروع على الخريطة
              </h2>
              <iframe
                title="خريطة المشروع"
                src={`https://www.google.com/maps?q=${encodeURIComponent(project.mapLocation)}&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-xl shadow"
              ></iframe>
            </div>
          )}

          {/* آراء العملاء */}
          {project.testimonials && (
            <div className="mt-8">
              <h2 className="text-lg md:text-xl font-bold mb-4">
                آراء العملاء
              </h2>
              <ul className="space-y-4">
                {project.testimonials.map((t, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 dark:bg-white/5 p-4 rounded-xl shadow-sm"
                  >
                    <p className="text-sm italic">"{t.feedback}"</p>
                    <p className="text-xs text-right mt-2 font-semibold text-[var(--brand-gold,#C28A17)]">
                      {t.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* زر التواصل */}
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent(`أرغب بمعلومات عن المشروع: ${project.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold shadow-md hover:brightness-105 transition"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
