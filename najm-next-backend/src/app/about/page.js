import React from 'react';
import AboutHero from './components/AboutHero';
import CompanyObjectivesDisplay from './components/CompanyObjectivesDisplay';

export const metadata = {
  title: 'عن الشركة | نجم راش للمقاولات',
  description:
    'تعرف على شركة نجم راش الرائدة في مجال المقاولات والتطوير الإنشائي. خبرة 25 عاماً في تنفيذ المشاريع بأعلى معايير الجودة.',
  keywords: ['عن الشركة', 'نجم راش', 'مقاولات', 'بناء', 'تشطيب', 'خبرة 25 عام'],
  openGraph: {
    title: 'عن شركة نجم راش للمقاولات',
    description: 'شركة رائدة في مجال المقاولات مع 25 عاماً من الخبرة',
    images: ['/images/about.jpg'],
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <AboutHero />

      {/* About Content Section */}
      <section id="about-content" className="relative w-full py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* البطاقة الزجاجية للنص */}
          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 animate-slide-up text-right transition-all duration-700 hover:scale-[1.02]">
            <button className="bg-[var(--gold,#C28A17)] text-black px-6 py-2 rounded-full font-semibold shadow-md ml-auto block hover:bg-[#C28A17]/90 transition">
              عن الشركة
            </button>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-xl mt-6">
              نبذة عن شركتنا
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed mt-6">
              نحن شركة رائدة في مجال المقاولات والتطوير الإنشائي، نعمل على تقديم
              حلول هندسية متكاملة تجمع بين الجودة والابتكار. تأسست شركتنا على
              مبادئ المهنية والالتزام، مما جعلها خيارًا موثوقًا للعديد من العملاء
              في تنفيذ مشاريعهم السكنية والتجارية.
            </p>

            <p className="text-lg text-gray-200 leading-relaxed mt-4">
              يضم فريقنا نخبة من المهندسين والخبراء المتخصصين، الذين يركزون على
              تنفيذ مشاريع بأعلى معايير الدقة والجودة. رؤيتنا هي بناء مستقبل أفضل
              يرتكز على الابتكار والاستدامة، مع الالتزام الكامل بتسليم المشاريع في
              الوقت المحدد.
            </p>

            <button className="mt-6 bg-[var(--secondary-color)] text-black font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[var(--secondary-color)]/90 transition">
              تواصل معنا
            </button>
          </div>

          {/* الصورة الجانبية بتصميم احترافي */}
          <div className="relative animate-slide-up transition-all duration-700 hover:scale-[1.03]">
            <div className="w-full h-96 overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/10 transform transition-transform duration-700 hover:rotate-1 hover:scale-[1.05]">
              <img
                src="/images/about.jpg"
                alt="about"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-110 hover:rotate-2"
              />
            </div>

            {/* عناصر زخرفية دائرية خلف الصورة */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--gold,#C28A17)] opacity-60 blur-3xl rounded-full animate-bounce-slow" />
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-[var(--third-color)] opacity-50 blur-2xl rounded-full animate-pulse-slow" />
          </div>
        </div>
      </section>

      {/* Company Objectives Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-4">
              أهداف الشركة
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              نسعى لتحقيق التميز والابتكار في كل مشروع نقوم به، ملتزمون برفع معايير الجودة والخدمة
            </p>
          </div>
          <CompanyObjectivesDisplay />
        </div>
      </section>
    </>
  );
}
