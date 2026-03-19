'use client';

import { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaUserTie } from 'react-icons/fa';

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team');
      if (response.ok) {
        const data = await response.json();
        setTeam(data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultTeam = [
    {
      id: 1,
      name: 'أحمد محمد',
      position: 'مدير المشاريع',
      bio: 'مهندس مدني مع أكثر من 15 عاماً من الخبرة في إدارة المشاريع الكبرى',
      phone: '0980438576',
      email: 'ahmed@najmrush.com',
    },
    {
      id: 2,
      name: 'سارة أحمد',
      position: 'مديرة التصميم',
      bio: 'مصممة داخلية متخصصة في التصاميم العصرية والكلاسيكية',
      phone: '0984986818',
      email: 'sara@najmrush.com',
    },
    {
      id: 3,
      name: 'محمد علي',
      position: 'مهندس تشطيب',
      bio: 'خبير في أعمال التشطيب والديكور بأحدث التقنيات والمواد',
      phone: '0999119202',
      email: 'mohamed@najmrush.com',
    },
  ];

  const allTeam = team.length > 0 ? team : defaultTeam;

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            فريقنا المتخصص
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نخبة من المهندسين والخبراء المتخصصين الذين يضمنون تنفيذ مشاريعكم
            بأعلى معايير الجودة والدقة
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allTeam.map((member) => (
            <div
              key={member.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
            >
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaUserTie className="w-10 h-10 text-white" />
              </div>

              {/* Info */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-gold font-semibold mb-4">{member.position}</p>

              {member.bio && (
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
              )}

              {/* Contact Info */}
              <div className="space-y-3">
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center justify-center gap-3 text-gray-700 hover:text-gold transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gold/10">
                      <FaPhone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{member.phone}</span>
                  </a>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-3 text-gray-700 hover:text-gold transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gold/10">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{member.email}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white">
          <FaUserTie className="w-16 h-16 text-gold mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            انضم إلى فريقنا
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            نحن نبحث دائماً عن المواهب الجديدة للانضمام إلى فريقنا المتخصص.
            إذا كنت مهندساً أو فنياً متخصصاً، تواصل معنا.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            تواصل معنا
          </a>
        </div>
      </div>
    </section>
  );
}
