// src/pages/AllServices.jsx
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const services = [
  {
    title: 'التعهدات الكاملة',
    image: '/images/service-contracting.jpg',
    desc: 'تنفيذ المشاريع من الألف إلى الياء، من التأسيس وحتى التسليم الكامل.',
    features: [
      'متابعة دقيقة لجميع مراحل المشروع',
      'ضمان الجودة العالية',
      'التسليم في الوقت المحدد',
    ],
    duration: 'من 3 إلى 12 شهر حسب حجم المشروع',
  },
  {
    title: 'التأسيس والتخطيط',
    image: '/images/service-planning.jpg',
    desc: 'إعداد المخططات، الأعمال الصحية والكهربائية، وتجهيز البنية التحتية.',
    features: [
      'تصاميم احترافية ومبتكرة',
      'استشارات هندسية متكاملة',
      'تخطيط متكامل للبنية التحتية',
    ],
    duration: '1 إلى 3 أشهر',
  },
  {
    title: 'الإكساء والتشطيب',
    image: '/images/services/finishing.svg',
    desc: 'تنفيذ كافة أعمال التشطيب: بلاط، دهانات، رخام، أسقف، وديكور.',
    features: [
      'مواد عالية الجودة',
      'تنفيذ دقيق واحترافي',
      'تصاميم ديكور مميزة',
    ],
    duration: '1 إلى 6 أشهر',
  },
  {
    title: 'أنظمة الكاميرات',
    image: '/images/service-cameras.jpg',
    desc: 'تركيب كاميرات مراقبة بأنواع متعددة مع دعم فني وضمان.',
    features: [
      'كاميرات عالية الجودة',
      'دعم فني مستمر',
      'ضمان كامل على التركيب',
    ],
    duration: 'أيام إلى أسبوعين',
  },
];

export default function AllServices() {
  return (
    <section
      className="py-24 min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/services-bg.jpg')" }}
    >
      {/* طبقة شفافة لتوضيح النصوص */}
      <div className="bg-black/50 py-12">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-16 text-white">
            <h1 className="text-5xl font-bold text-[var(--gold,#C28A17)] mb-4">
              جميع خدماتنا
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed">
              اكتشف مجموعة متكاملة من خدمات شركة نجم راش للمقاولات والتصميم
              الداخلي.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block text-sm text-[var(--brand-gold,#C28A17)] underline hover:text-white transition"
            >
              العودة للصفحة الرئيسية
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-3 hover:scale-105 border border-white/20"
              >
                <div className="h-52 overflow-hidden rounded-t-3xl">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 text-white flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                    <p className="text-sm leading-relaxed mb-4">{s.desc}</p>
                    <ul className="mb-4 space-y-2">
                      {s.features.map((f, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <FaCheckCircle className="text-[var(--gold,#C28A17)] w-4 h-4 flex-shrink-0" />{' '}
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-semibold">
                      مدة التنفيذ: {s.duration}
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-4 inline-block bg-[var(--gold,#C28A17)] text-[#0B1220] font-bold py-2 px-4 rounded-xl text-center hover:bg-[#C28A17]/90 transition"
                  >
                    اطلب الخدمة الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
