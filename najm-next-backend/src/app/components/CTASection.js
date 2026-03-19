'use client';

import { useState, useEffect } from 'react';
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
} from 'react-icons/fa';

export default function CTASection() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings();
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

  const WA =
    settings.whatsapp_number ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '123456789';
  const phone = settings.phone || '+966112345678';
  const email = settings.email || 'info@najmrush.com';

  const benefits = [
    {
      icon: FaCheckCircle,
      title: 'استشارة مجانية',
      description: 'تقييم مجاني لمشروعك وتقديم أفضل الحلول',
    },
    {
      icon: FaClock,
      title: 'تسليم في الموعد',
      description: 'التزام تام بالمواعيد المحددة للمشروع',
    },
    {
      icon: FaShieldAlt,
      title: 'ضمان شامل',
      description: 'ضمان على جميع الأعمال والخدمات المقدمة',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gold/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                هل لديك مشروع إنشائي؟
                <span className="block text-gold">نحن هنا لمساعدتك!</span>
              </h2>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                فريقنا من الخبراء جاهز لتحويل رؤيتك إلى واقع. اتصل بنا اليوم
                واحصل على استشارة مجانية وتقييم دقيق لمشروعك مع أفضل الحلول
                والأسعار التنافسية.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span>واتساب</span>
                </a>

                <a
                  href={`tel:${phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <FaPhone className="w-5 h-5" />
                  <span>اتصل بنا</span>
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                تواصل معنا الآن
              </h3>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => window.open(`https://wa.me/${WA}`, '_blank')}
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">واتساب</div>
                    <div className="text-gray-300 text-sm">استشارة فورية</div>
                  </div>
                  <FaArrowLeft className="w-5 h-5 text-gold" />
                </div>

                {/* Phone */}
                <div
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => window.open(`tel:${phone}`)}
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaPhone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{phone}</div>
                    <div className="text-gray-300 text-sm">اتصل بنا مباشرة</div>
                  </div>
                  <FaArrowLeft className="w-5 h-5 text-gold" />
                </div>

                {/* Email */}
                <div
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => window.open(`mailto:${email}`)}
                >
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                    <FaEnvelope className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{email}</div>
                    <div className="text-gray-300 text-sm">أرسل استفسارك</div>
                  </div>
                  <FaArrowLeft className="w-5 h-5 text-gold" />
                </div>
              </div>

              {/* Emergency Note */}
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="text-white font-semibold text-sm">
                      خدمة 24/7
                    </div>
                    <div className="text-gray-300 text-xs">
                      متوفرون دائماً لخدمتكم
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                24
              </div>
              <div className="text-gray-300 text-sm">ساعة خدمة</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                7
              </div>
              <div className="text-gray-300 text-sm">أيام الأسبوع</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                365
              </div>
              <div className="text-gray-300 text-sm">يوم في السنة</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                ∞
              </div>
              <div className="text-gray-300 text-sm">رضا العملاء</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
