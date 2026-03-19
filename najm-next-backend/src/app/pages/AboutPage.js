import React from 'react';

export default function AboutPage() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/about.jpg')" }}
    >
      {/* طبقة تدرج فوق الخلفية */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 font-[var(--arabic-font)]">
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
          <div className="w-full h-full overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/10 transform transition-transform duration-700 hover:rotate-1 hover:scale-[1.05]">
            <img
              src="/images/about-image.jpg"
              alt="about"
              className="w-full h-full object-cover transition-all duration-700 hover:scale-110 hover:rotate-2"
            />
          </div>

          {/* عناصر زخرفية دائرية خلف الصورة */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[var(--gold,#C28A17)] opacity-60 blur-3xl rounded-full animate-bounce-slow" />
          <div className="absolute -top-8 -right-8 w-28 h-28 bg-[var(--third-color)] opacity-50 blur-2xl rounded-full animate-pulse-slow" />
        </div>
      </section>
    </div>
  );
}
