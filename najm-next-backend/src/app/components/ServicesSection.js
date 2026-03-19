'use client';

import React, { useState, useEffect } from 'react';
import { FaTools, FaPaintBrush, FaHammer, FaCamera, FaNetworkWired, FaKey, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { getServices, getStrapiMedia } from '../../lib/strapi';

const iconMap = {
  tools: FaTools,
  paint: FaPaintBrush,
  hammer: FaHammer,
  camera: FaCamera,
  network: FaNetworkWired,
  key: FaKey,
};

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices();
        if (data && data.length > 0) {
          setServices(data.map((s) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            icon: iconMap[s.icon] || FaTools,
            image: getStrapiMedia(s.image?.url) || '/images/services/default.jpg',
            features: s.features ? s.features.split('\n').filter(Boolean) : [s.description],
          })));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">خدماتنا المتميزة</h2>
          <p className="text-gray-500">لا توجد خدمات متاحة حالياً</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">خدماتنا المتميزة</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات الإنشائية والتشطيبية بأعلى معايير الجودة والمهنية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveService(index)}
              className={`group cursor-pointer p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${
                activeService === index ? 'border-gold bg-gradient-to-br from-gold/5 to-yellow-50' : 'border-transparent hover:border-gold/30'
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
              <div className="flex items-center text-gold font-medium">
                <span>عرض التفاصيل</span>
                <FaArrowLeft className="w-4 h-4 mr-2" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-auto">
              <img src={services[activeService].image} alt={services[activeService].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-6 right-6 text-right">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{services[activeService].title}</h3>
                <div className="w-16 h-1 bg-gold rounded-full"></div>
              </div>
            </div>
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-500 rounded-2xl flex items-center justify-center">
                  {React.createElement(services[activeService].icon, { className: 'w-8 h-8 text-white' })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{services[activeService].title}</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{services[activeService].description}</p>
              <div className="space-y-4 mb-8">
                {services[activeService].features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <a href="#contact" className="flex-1 px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold text-center rounded-xl hover:shadow-lg transition-all">اطلب عرض سعر</a>
                <a href="#projects" className="flex-1 px-8 py-4 border-2 border-gold text-gold font-semibold text-center rounded-xl hover:bg-gold hover:text-black transition-all">شاهد أعمالنا</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}