'use client';

export default function Services() {
  const services = [
    {
      title: 'التعهدات الكاملة',
      image: '/images/service-contracting.jpg',
      desc: 'تنفيذ المشاريع من الألف إلى الياء، من التأسيس وحتى التسليم الكامل.',
    },
    {
      title: 'التأسيس والتخطيط',
      image: '/images/service-planning.jpg',
      desc: 'إعداد المخططات، الأعمال الصحية والكهربائية، وتجهيز البنية التحتية.',
    },
    {
      title: 'الإكساء والتشطيب',
      image: '/images/services/finishing.svg',
      desc: 'تنفيذ كافة أعمال التشطيب: بلاط، دهانات، رخام، أسقف، وديكور.',
    },
    {
      title: 'أنظمة الكاميرات',
      image: '/images/service-cameras.jpg',
      desc: 'تركيب كاميرات مراقبة بأنواع متعددة مع دعم فني وضمان.',
    },
  ];

  return (
    <section className="bg-[#0B1220] py-20">
      <div className="container px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[var(--gold,#C28A17)] mb-4">
            خدماتنا
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
            نقدم مجموعة من الخدمات المتكاملة لضمان نجاح مشاريعكم بأعلى معايير
            الجودة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-[#F7F5F2] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="h-48">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6 text-[#0B1A2B]">
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
