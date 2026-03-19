'use client';

import { useState, useEffect } from 'react';
import {
  FaBuilding,
  FaUsers,
  FaAward,
  FaHandshake,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';

export default function StatsSection() {
  const [stats, setStats] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchStats();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        // Use settings or default stats
        setStats([
          {
            number: data.stats_projects || '500+',
            label: 'مشروع مكتمل',
            icon: FaBuilding,
            description: 'مشاريع متنوعة في جميع المجالات',
          },
          {
            number: data.stats_clients || '1000+',
            label: 'عميل راضٍ',
            icon: FaUsers,
            description: 'عملاء يثقون بخدماتنا',
          },
          {
            number: data.stats_experience || '25+',
            label: 'عاماً من الخبرة',
            icon: FaAward,
            description: 'خبرة متراكمة في السوق',
          },
          {
            number: data.stats_partners || '50+',
            label: 'شريك استراتيجي',
            icon: FaHandshake,
            description: 'شراكات ناجحة مع أفضل الشركات',
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Default stats
      setStats([
        {
          number: '500+',
          label: 'مشروع مكتمل',
          icon: FaBuilding,
          description: 'مشاريع متنوعة في جميع المجالات',
        },
        {
          number: '1000+',
          label: 'عميل راضٍ',
          icon: FaUsers,
          description: 'عملاء يثقون بخدماتنا',
        },
        {
          number: '25+',
          label: 'عاماً من الخبرة',
          icon: FaAward,
          description: 'خبرة متراكمة في السوق',
        },
        {
          number: '50+',
          label: 'شريك استراتيجي',
          icon: FaHandshake,
          description: 'شراكات ناجحة مع أفضل الشركات',
        },
      ]);
    }
  };

  const Counter = ({ number, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const target = parseInt(number.replace('+', ''));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps

      const timer = setInterval(() => {
        setCount((prev) => {
          const next = prev + increment;
          if (next >= target) {
            clearInterval(timer);
            return target;
          }
          return next;
        });
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, number]);

    return (
      <span className="text-4xl md:text-5xl font-bold text-gold">
        {Math.floor(count)}
        {number.includes('+') ? '+' : ''}
      </span>
    );
  };

  return (
    <section
      id="stats-section"
      className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            إنجازاتنا بالأرقام
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            نحن فخورون بما حققناه خلال مسيرتنا المهنية، ونستمر في تحقيق المزيد
            من الإنجازات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold/20"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-white" />
              </div>

              {/* Counter */}
              <div className="mb-4">
                <Counter number={stat.number} isVisible={isVisible} />
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-white mb-3">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {stat.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-6 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-yellow-500 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${index * 200}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="flex items-center justify-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <FaClock className="w-8 h-8 text-gold" />
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-gray-400">دعم فني</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <FaCheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-gray-400">ضمان الجودة</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <FaAward className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-white">ISO</div>
              <div className="text-gray-400">معتمد</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
