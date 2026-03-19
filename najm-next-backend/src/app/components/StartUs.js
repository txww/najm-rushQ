'use client';

export default function ServicesHeroStyle() {
  const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '123456789';

  return (
    <section className="pt-24 pb-28">
      <div className="container mx-auto px-6">
        <div
          className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.25)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(11,18,32,0.45), rgba(11,18,32,0.55)), url('/images/banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="p-12 md:p-20 text-center text-white space-y-6">
            {/* العنوان الرئيسي */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--brand-gold,#C28A17)] drop-shadow-lg">
              نبــني بثقــة
            </h1>

            {/* العنوان الثانوي */}
            <h2 className="text-3xl md:text-4xl font-bold text-white/95">
              ونصمّم بإتقان وجودة عالية
            </h2>

            {/* الوصف الجديد */}
            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              نقدم حلول مقاولات احترافية من التخطيط حتى التنفيذ المتكامل، مع
              التزام تام بالجودة، الدقة، وتقديم أفضل النتائج في كل مشروع.
            </p>

            {/* زر الاتصال */}
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent(
                'مرحباً، أريد البدء بمشروعي وأرغب بمعرفة التفاصيل.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 mt-4 rounded-xl bg-[var(--brand-gold,#C28A17)] text-black font-bold text-lg hover:bg-[#dca73b] transition shadow-xl"
            >
              ابدأ مشروعك معنا الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
