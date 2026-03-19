'use client';

import { useState, useEffect } from 'react';
import {
  FaAward,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
} from 'react-icons/fa';

export default function AboutSection() {
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

  const aboutTitle = settings.about_title || 'عن شركة نجم راش للمقاولات';
  const aboutDescription =
    settings.about_description ||
    'نحن شركة رائدة في مجال المقاولات والإنشاءات، متخصصة في تقديم حلول متكاملة للمشاريع الإنشائية بأعلى معايير الجودة والمهنية.';

  const stats = [
    { number: '25+', label: 'عاماً من الخبرة', icon: FaAward },
    { number: '500+', label: 'مشروع مكتمل', icon: FaUsers },
    { number: '1000+', label: 'عميل راضٍ', icon: FaHandshake },
    { number: '50+', label: 'مهندس وفني', icon: FaShieldAlt },
  ];

  const values = [
    {
      title: 'الجودة العالية',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا',
      icon: FaCheckCircle,
    },
    {
      title: 'الثقة والأمانة',
      description: 'نبني علاقات طويلة الأمد مع عملائنا على أساس الثقة',
      icon: FaShieldAlt,
    },
    {
      title: 'الابتكار والتطوير',
      description: 'نستخدم أحدث التقنيات والأساليب في مجال الإنشاءات',
      icon: FaStar,
    },
    {
      title: 'الشراكة الاستراتيجية',
      description: 'نعمل مع أفضل الموردين والشركاء لضمان النجاح',
      icon: FaHandshake,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {aboutTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {aboutDescription}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/about-company.svg"
                alt="فريق العمل"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">مشاريع مكتملة</div>
                  <div className="text-gray-600">بنجاح 100%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              رؤيتنا ورسالتنا
            </h3>
            <p className="text-gray-600 leading-relaxed">
              نسعى لأن نكون الشركة الرائدة في مجال المقاولات في المنطقة، من خلال
              تقديم خدمات متميزة تجمع بين الجودة العالية والابتكار والالتزام
              بالمواعيد والميزانيات.
            </p>
            <p className="text-gray-600 leading-relaxed">
              نحن نؤمن بأن النجاح الحقيقي يأتي من رضا عملائنا، لذلك نضع
              احتياجاتهم في مقدمة أولوياتنا ونسعى دائماً لتجاوز توقعاتهم.
            </p>

            {/* Mission Points */}
            <div className="space-y-3">
              {[
                'التزام تام بالجودة والسلامة',
                'استخدام أحدث التقنيات والمعدات',
                'فريق عمل محترف ومؤهل',
                'خدمة عملاء على مدار 24 ساعة',
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              قيمنا الأساسية
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              القيم التي نؤمن بها ونسعى لتحقيقها في كل مشروع نقوم به
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
