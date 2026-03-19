'use client';
import Link from 'next/link';

export default function ServicesHeroStyle() {
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '123456789';

  const services = [
    'التعهدات الكاملة',
    'التأسيس والتخطيط',
    'الإكساء والتشطيب',
    'أنظمة الكاميرات',
  ];

  return (
    <section className="pt-20 pb-24">
      <div className="container mx-auto px-6">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(11,18,32,0.62), rgba(11,18,32,0.62)), url('/images/services-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="p-12 md:p-20 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--brand-gold,#C28A17)] mb-6 leading-tight">
              خدماتنا
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-white/85 mb-10">
              نقدم مجموعة متكاملة من الخدمات لتلبية احتياجات مشاريع المقاولات
              والتشطيب، بخبرة عالية وجودة تنفيذ.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
              {services.map((s, i) => (
                <li
                  key={i}
                  className="bg-white/10 text-white p-6 rounded-xl border border-white/10 hover:bg-white/20 transition"
                >
                  <h3 className="text-lg font-semibold">{s}</h3>
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="inline-block bg-[var(--brand-gold,#C28A17)] px-10 py-4 rounded-full text-black font-bold text-lg shadow-xl hover:bg-[#d9a233] transition"
            >
              عرض جميع الخدمات
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
