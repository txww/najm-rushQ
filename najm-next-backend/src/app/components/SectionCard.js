'use client';
import Link from 'next/link';
import { HiOutlinePresentationChartBar } from 'react-icons/hi';
import PropTypes from 'prop-types';

export default function SectionCard({
  id,
  name,
  image,
  description,
  variant = 'default', // "default" | "dark"
}) {
  const dark = variant === 'dark';

  return (
    <article
      className={`relative rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col ${dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'}`}
    >
      {/* صورة الهيرو مع تدرّج */}
      <div className="relative h-44 md:h-48 lg:h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

        {/* شعار/اسم داخل الصورة */}
        <div className="absolute left-4 bottom-4 right-4 text-white z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white/10 rounded-full p-2 backdrop-blur-sm">
              <HiOutlinePresentationChartBar className="text-white text-lg" />
            </div>
            <span className="text-sm font-medium text-white/90">{name}</span>
          </div>
          <h3 className="text-lg md:text-xl font-extrabold leading-tight text-white drop-shadow-lg">
            {name}
          </h3>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div
        className={`p-4 md:p-5 flex-1 flex flex-col gap-3 ${dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'}`}
      >
        <p className="text-sm leading-relaxed mb-2 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <Link
            href={`/materials/${id}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold text-sm shadow-md hover:brightness-95 transition"
            aria-label={`عرض أنواع ${name}`}
          >
            عرض الأنواع
          </Link>

          <Link
            href={`/materials/${id}`}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${dark ? 'border-white/20 text-white/90 bg-white/5 hover:bg-white/10' : 'border-slate-200 text-slate-700 bg-transparent hover:bg-slate-50'}`}
            aria-label={`تفاصيل ${name}`}
          >
            تفاصيل
          </Link>
        </div>
      </div>

      {/* ظل زخرفي سفلي */}
      <div className="pointer-events-none absolute inset-x-6 bottom-4 h-2 rounded-full bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-30"></div>
    </article>
  );
}

SectionCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'dark']),
};
