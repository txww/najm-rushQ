'use client'; // مهم لأننا نستخدم متغيرات بيئية و react-icons و API

import { useState, useEffect } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPlay,
  FaArrowRight,
  FaStar,
} from 'react-icons/fa';

export default function Hero() {
  const [settings, setSettings] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchSettings();
    // Auto-slide functionality
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
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
  const facebookUrl = settings.facebook_url || '#';
  const instagramUrl = settings.instagram_url || '#';
  const heroTitle = settings.hero_title || 'نجــم راش للمقاولات';
  const heroDescription =
    settings.hero_description ||
    'نقدم خدمات متخصصة في تنفيذ أعمال التشطيب، الحجر الصناعي، بدائل الخشب، الرخام، الباركيه، أنظمة الكاميرات والشبكات، إضافة إلى التعهدات الكاملة من التأسيس حتى التسليم بالمفتاح — بجودة عالية ومهنية تليق بعملائنا.';

  const slides = [
    {
      image: '/images/about.jpg',
      title: 'الريادة في الإنشاءات',
      subtitle: 'أكثر من 25 عاماً من التميز والإبداع',
    },
    {
      image: '/images/about.jpg',
      title: 'جودة لا تُقبل المساومة',
      subtitle: 'نفذ مشاريعك بأعلى معايير الجودة العالمية',
    },
    {
      image: '/images/about.jpg',
      title: 'حلول متكاملة',
      subtitle: 'من التأسيس إلى التسليم بالمفتاح',
    },
  ];

  return (
    <header className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Enhanced Gradient Overlay with better eye comfort */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
        {/* Additional soft overlay for eye comfort */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10" />
      </div>

      {/* Floating Elements - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-gold/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-40 right-20 w-36 h-36 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-1000" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-green-500/8 rounded-full blur-2xl animate-pulse delay-2000" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-3000" style={{ animationDuration: '7s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Trust Indicators - Enhanced */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 opacity-95 animate-fade-in">
            <div className="flex items-center gap-3 bg-white/12 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg">
              <div className="flex text-yellow-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 drop-shadow-sm" />
                ))}
              </div>
              <span className="text-white text-sm font-medium tracking-wide">
                تقييم 5 نجوم
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/12 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg">
              <span className="text-white text-sm font-medium tracking-wide">
                25+ عاماً من الخبرة
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/12 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 shadow-lg">
              <span className="text-white text-sm font-medium tracking-wide">
                500+ مشروع مكتمل
              </span>
            </div>
          </div>

          {/* Logo - Enhanced */}
          <div className="mb-10 animate-scale-in">
            <img
              src="/images/nj_logo.png"
              alt="NRC Logo"
              className="mx-auto w-36 md:w-44 drop-shadow-2xl hover:scale-105 transition-all duration-500 filter brightness-110"
            />
          </div>

          {/* Main Title - Enhanced */}
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight animate-slide-up delay-200 tracking-wide">
            <span className="bg-gradient-to-r from-gold via-yellow-200 to-gold bg-clip-text text-transparent drop-shadow-lg">
              {heroTitle}
            </span>
          </h1>

          {/* Subtitle - Enhanced */}
          <p className="text-xl md:text-3xl text-white/95 mb-6 font-light leading-relaxed animate-slide-up delay-300 max-w-5xl mx-auto tracking-wide">
            {slides[currentSlide].title}
          </p>

          {/* Description - Enhanced */}
          <p className="text-lg md:text-2xl text-white/85 mb-14 leading-relaxed animate-slide-up delay-400 max-w-4xl mx-auto font-light tracking-wide">
            {heroDescription}
          </p>

          {/* CTA Buttons - Enhanced */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 animate-scale-in delay-500">
            <a
              href="#contact"
              className="group px-10 py-5 bg-gradient-to-r from-gold via-yellow-400 to-gold text-black font-bold text-xl rounded-2xl shadow-2xl hover:shadow-gold/40 hover:scale-105 transition-all duration-500 flex items-center gap-4 border-2 border-gold/20 hover:border-gold/40"
            >
              اطلب استشارة مجانية
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 text-lg" />
            </a>

            <a
              href="#services"
              className="group px-10 py-5 border-2 border-white/30 text-white font-semibold text-xl rounded-2xl hover:bg-white/15 hover:border-white/50 transition-all duration-500 backdrop-blur-md flex items-center gap-4 shadow-xl hover:shadow-2xl"
            >
              <FaPlay className="text-gold text-lg group-hover:scale-110 transition-transform" />
              شاهد أعمالنا
            </a>
          </div>

          {/* Social Media & Contact - Enhanced */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-fade-in delay-600">
            {/* Social Media Icons - Enhanced */}
            <div className="flex items-center gap-6">
              {facebookUrl !== '#' && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-[#1877F2] hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40"
                  title="تابعنا على فيسبوك"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
              )}

              {instagramUrl !== '#' && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#833AB4] hover:to-[#FD1D1D] hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40"
                  title="تابعنا على إنستغرام"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              )}

              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-[#25D366] hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40"
                title="تواصل معنا عبر واتساب"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>

            {/* Quick Contact - Enhanced */}
            <div className="text-center sm:text-left bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <p className="text-white/90 text-base mb-2 font-medium">للاستفسارات والطلبات</p>
              <a
                href={`https://wa.me/${WA}`}
                className="text-gold hover:text-yellow-300 font-bold text-lg transition-all duration-300 hover:scale-105 inline-block"
              >
                {settings.phone || '+966112345678'}
              </a>
              <p className="text-white/70 text-sm mt-1">متوفر 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Enhanced */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-500 shadow-lg ${
              index === currentSlide
                ? 'bg-gold scale-125 shadow-gold/50'
                : 'bg-white/40 hover:bg-white/70 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator - Enhanced */}
      <div className="absolute bottom-12 right-12 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center bg-white/5 backdrop-blur-sm shadow-lg">
          <div className="w-1.5 h-4 bg-gold rounded-full mt-2 animate-pulse shadow-sm"></div>
        </div>
        <p className="text-white/60 text-xs mt-2 text-center font-light">تمرير للأسفل</p>
      </div>
    </header>
  );
}
