'use client';

import { useState, useEffect } from 'react';
import {
  FaEye,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowLeft,
} from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.slice(0, 6)); // Show only first 6 projects
      } else {
        // Fallback projects
        setProjects([
          {
            id: 1,
            title: 'فيلا فاخرة في الرياض',
            category: 'residential',
            location: 'الرياض',
            completionDate: '2024',
            image: '/images/projects/villa-1.jpg',
            description:
              'فيلا فاخرة بمساحة 600 متر مربع مع تشطيب كامل ونظام أمني متكامل',
          },
          {
            id: 2,
            title: 'مجمع سكني في جدة',
            category: 'residential',
            location: 'جدة',
            completionDate: '2024',
            image: '/images/projects/residential-1.jpg',
            description: 'مجمع سكني يتكون من 20 وحدة سكنية مع جميع المرافق',
          },
          {
            id: 3,
            title: 'مطعم عصري في الدمام',
            category: 'commercial',
            location: 'الدمام',
            completionDate: '2023',
            image: '/images/projects/restaurant-1.jpg',
            description: 'تصميم داخلي عصري لمطعم بمساحة 300 متر مربع',
          },
          {
            id: 4,
            title: 'مكتب إداري في الرياض',
            category: 'commercial',
            location: 'الرياض',
            completionDate: '2023',
            image: '/images/projects/office-1.jpg',
            description: 'مكتب إداري بتصميم عصري ومرافق متكاملة',
          },
          {
            id: 5,
            title: 'فللة صيفية في الطائف',
            category: 'residential',
            location: 'الطائف',
            completionDate: '2024',
            image: '/images/projects/villa-2.jpg',
            description: 'فللة صيفية مع حديقة ومسابح خاصة',
          },
          {
            id: 6,
            title: 'مركز تسوق في المدينة',
            category: 'commercial',
            location: 'المدينة المنورة',
            completionDate: '2023',
            image: '/images/projects/mall-1.jpg',
            description: 'مركز تسوق تجاري مع محلات متنوعة',
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const categories = [
    { id: 'all', label: 'جميع المشاريع', count: projects.length },
    {
      id: 'residential',
      label: 'سكني',
      count: projects.filter((p) => p.category === 'residential').length,
    },
    {
      id: 'commercial',
      label: 'تجاري',
      count: projects.filter((p) => p.category === 'commercial').length,
    },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            مشاريعنا المتميزة
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة من أبرز مشاريعنا التي نفخر بتنفيذها بأعلى معايير الجودة
            والإبداع
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-gold to-yellow-500 text-black shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
              <span className="mr-2 text-sm opacity-75">
                ({category.count})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay Content */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold hover:bg-white transition-colors"
                  >
                    <FaEye className="w-4 h-4" />
                    <span>عرض المشروع</span>
                  </Link>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.category === 'residential'
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {project.category === 'residential' ? 'سكني' : 'تجاري'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Project Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="w-4 h-4 text-gold" />
                    <span>{project.location}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="w-4 h-4 text-gold" />
                    <span>{project.completionDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span>عرض جميع المشاريع</span>
            <FaArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                500+
              </div>
              <div className="text-gray-300">مشروع مكتمل</div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                25+
              </div>
              <div className="text-gray-300">عاماً من الخبرة</div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                1000+
              </div>
              <div className="text-gray-300">عميل راضٍ</div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                50+
              </div>
              <div className="text-gray-300">مهندس وفني</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
