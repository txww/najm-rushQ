'use client';

import { useState, useEffect } from 'react';
import { FaHandshake, FaBuilding, FaTools, FaShieldAlt } from 'react-icons/fa';

export default function PartnersSection() {
  const [settings, setSettings] = useState({});
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
    fetchPartners();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      if (response.ok) {
        const data = await response.json();
        setPartners(data);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultPartners = [
    {
      name: 'شركة مواد البناء الأولى',
      logo: '/images/partners/partner1.svg',
      description: 'مزود رئيسي لمواد البناء عالية الجودة',
      category: 'materials',
    },
    {
      name: 'مؤسسة الرخام الفاخر',
      logo: '/images/partners/partner2.svg',
      description: 'متخصصون في توريد الرخام والجرانيت المستورد',
      category: 'materials',
    },
    {
      name: 'شركة الأنظمة الأمنية',
      logo: '/images/partners/partner3.svg',
      description: 'حلول أمنية متكاملة وأنظمة مراقبة متقدمة',
      category: 'technology',
    },
    {
      name: 'مصنع الحجر الصناعي',
      logo: '/images/partners/partner4.svg',
      description: 'إنتاج الحجر الصناعي بأحدث التقنيات العالمية',
      category: 'materials',
    },
    {
      name: 'شركة الشبكات المتقدمة',
      logo: '/images/partners/partner5.svg',
      description: 'خدمات الشبكات والاتصالات المتكاملة',
      category: 'technology',
    },
    {
      name: 'مؤسسة الأدوات المهنية',
      logo: '/images/partners/partner6.svg',
      description: 'توريد المعدات والأدوات الإنشائية المتخصصة',
      category: 'tools',
    },
  ];

  const allPartners = partners.length > 0 ? partners.map(partner => ({
    id: partner.id,
    name: partner.name,
    logo: '/images/placeholder-partner.png',
    description: partner.website ? `شريك تقني - ${partner.website}` : 'شريك استراتيجي موثوق',
    category: 'strategic',
    website: partner.website,
  })) : defaultPartners;

  const partnershipTypes = [
    {
      icon: FaBuilding,
      title: 'الشركاء الاستراتيجيين',
      description: 'شراكات طويلة الأمد مع أفضل الشركات في المجال',
      count: '50+ شريك',
    },
    {
      icon: FaTools,
      title: 'مزودي المواد',
      description: 'أفضل مصادر المواد عالية الجودة والموثوقة',
      count: '30+ مورد',
    },
    {
      icon: FaShieldAlt,
      title: 'الشركاء التقنيين',
      description: 'تعاون مع الشركات التقنية الرائدة عالمياً',
      count: '15+ شريك تقني',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            شركاؤنا في النجاح
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نفخر بشركائنا الاستراتيجيين الذين يساهمون في تقديم أفضل الخدمات
            والحلول لعملائنا
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {partnershipTypes.map((type, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <type.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {type.title}
              </h3>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <div className="text-2xl font-bold text-gold">{type.count}</div>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {loading ? (
            // Loading state
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg text-center animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-xl mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            allPartners.map((partner, index) => (
              <div
                key={partner.id || index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors">
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 flex items-center justify-center text-2xl hover:text-gold transition-colors"
                    >
                      🤝
                    </a>
                  ) : (
                    <span className="text-2xl">🤝</span>
                  )}
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  {partner.name}
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {partner.description}
                </p>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-gold hover:text-yellow-600 transition-colors"
                  >
                    زيارة الموقع
                  </a>
                )}
              </div>
            ))
          )}
        </div>

        {/* Why Partner With Us */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <FaHandshake className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              لماذا تتعاون معنا؟
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نبني شراكات ناجحة ومستدامة مع شركائنا لتحقيق التميز والنجاح
              المشترك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">25</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">عاماً من الخبرة</h4>
              <p className="text-gray-300 text-sm">
                خبرة متراكمة في إدارة الشراكات الناجحة
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">500+</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">مشروع مشترك</h4>
              <p className="text-gray-300 text-sm">
                مشاريع ناجحة تم تنفيذها مع شركائنا
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">100%</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">رضا الشركاء</h4>
              <p className="text-gray-300 text-sm">
                نسبة رضا عالية من جميع شركائنا
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gold">24/7</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">دعم متواصل</h4>
              <p className="text-gray-300 text-sm">
                دعم فني وإداري على مدار الساعة
              </p>
            </div>
          </div>

          {/* CTA for Partners */}
          <div className="mt-12 text-center">
            <p className="text-xl text-gray-300 mb-6">
              هل تريد أن تكون شريكاً لنا في النجاح؟
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
