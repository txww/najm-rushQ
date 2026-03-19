'use client';

import { useState, useEffect } from 'react';
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultTestimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      position: 'مدير مشاريع',
      company: 'شركة البناء الحديث',
      image: '/images/testimonials/client1.svg',
      rating: 5,
      text: 'تعاملت مع شركة نجم راش في تشطيب فيلا كاملة، وكان العمل احترافياً من البداية للنهاية. الجودة عالية والالتزام بالمواعيد ممتاز. أنصح بالتعامل معهم بشدة.',
      project: 'تشطيب فيلا 500م²',
    },
    {
      id: 2,
      name: 'فاطمة علي',
      position: 'ربة منزل',
      company: '',
      image: '/images/testimonials/client2.svg',
      rating: 5,
      text: 'رائع جداً! قاموا بتركيب الحجر الصناعي في منزلي بمهنية فائقة. النتيجة كانت مذهلة والسعر مناسب. شكراً لفريق العمل على الجهد المبذول.',
      project: 'تركيب حجر صناعي',
    },
    {
      id: 3,
      name: 'محمد عبدالله',
      position: 'مالك شركة',
      company: 'مجموعة الأعمال التجارية',
      image: '/images/testimonials/client3.svg',
      rating: 5,
      text: 'نحن نعتمد على شركة نجم راش في جميع مشاريعنا الإنشائية. دائماً ما يقدمون أعمالاً عالية الجودة ويحترمون المواعيد والميزانيات. شراكة ناجحة ومستمرة.',
      project: 'مجمع سكني 20 وحدة',
    },
    {
      id: 4,
      name: 'سارة أحمد',
      position: 'مهندسة معمارية',
      company: 'مكتب التصميم المعماري',
      image: '/images/testimonials/client4.svg',
      rating: 5,
      text: 'فريق محترف وماهر. قاموا بتنفيذ أعمال التشطيب في مشروعنا بأدق التفاصيل. التواصل ممتاز والمتابعة مستمرة حتى التسليم النهائي.',
      project: 'عمارة سكنية 15 طابق',
    },
    {
      id: 5,
      name: 'خالد يوسف',
      position: 'مدير تنفيذي',
      company: 'شركة التطوير العقاري',
      image: '/images/testimonials/client5.svg',
      rating: 5,
      text: 'من أفضل الشركات التي تعاملت معها. جودة العمل عالية والأسعار تنافسية. قاموا بتركيب أنظمة الكاميرات والشبكات في مبانينا بكفاءة واحترافية.',
      project: 'نظام أمني متكامل',
    },
  ];

  const allTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % allTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [allTestimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            آراء عملائنا
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            رضا عملائنا هو أكبر إنجاز لنا، وإليكم بعض الآراء والتجارب مع خدماتنا
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
                  ))}
                </div>
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
                <div className="flex items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : allTestimonials.length > 0 ? (
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <FaQuoteLeft className="w-12 h-12 text-gold/30" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(allTestimonials[currentTestimonial].rating || 5)].map(
                      (_, i) => (
                        <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                      )
                    )}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                    "{allTestimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center border-4 border-gold/20">
                        <span className="text-2xl font-bold text-gold">
                          {allTestimonials[currentTestimonial].name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {allTestimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-600">
                        {allTestimonials[currentTestimonial].position}
                      </p>
                      {allTestimonials[currentTestimonial].company && (
                        <p className="text-sm text-gold font-medium">
                          {allTestimonials[currentTestimonial].company}
                        </p>
                      )}
                      {allTestimonials[currentTestimonial].project && (
                        <p className="text-sm text-gray-500 mt-1">
                          مشروع: {allTestimonials[currentTestimonial].project}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="relative p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-gold/5 to-yellow-50">
                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={prevTestimonial}
                      className="w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <FaChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <FaChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {allTestimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'bg-gold scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <p className="text-gray-500 text-lg">لا توجد آراء عملاء حالياً</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
              98%
            </div>
            <div className="text-gray-600">رضا العملاء</div>
          </div>

          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
              4.9
            </div>
            <div className="text-gray-600">متوسط التقييم</div>
          </div>

          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
              500+
            </div>
            <div className="text-gray-600">عميل راضٍ</div>
          </div>

          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
              24/7
            </div>
            <div className="text-gray-600">دعم متواصل</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gold to-yellow-500 rounded-3xl p-8 md:p-12 text-black">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              كن أنت التالي في قائمة عملائنا الراضين!
            </h3>
            <p className="text-lg mb-8 opacity-90">
              انضم إلى مئات العملاء الذين يثقون بخدماتنا ويوصون بها
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              ابدأ مشروعك الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
