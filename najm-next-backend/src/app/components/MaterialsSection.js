'use client';

import { useState, useEffect } from 'react';
import { FaEye, FaArrowLeft, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import { getMaterials, getStrapiMedia } from '../../lib/strapi';

export default function MaterialsSection() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMaterials();
        if (data && data.length > 0) {
          setMaterials(data.slice(0, 8));
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">موادنا المتميزة</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة واسعة من أفضل المواد والمنتجات عالية الجودة لمشاريعك الإنشائية
          </p>
        </div>

        {materials.length === 0 ? (
          <div className="text-center py-20 text-gray-500">لا توجد مواد متاحة حالياً</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {materials.map((material) => {
              const imageUrl = getStrapiMedia(
                material.image?.url || material.image?.formats?.medium?.url
              );
              return (
                <div key={material.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageUrl || '/images/placeholder-material.jpg'}
                      alt={material.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/images/placeholder-material.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href={`/materials/${material.documentId || material.id}`} className="inline-flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-semibold text-sm">
                        <FaEye className="w-4 h-4" />
                        <span>عرض التفاصيل</span>
                      </Link>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <FaStar className="w-3 h-3 text-white" />
                        <span className="text-xs font-semibold text-white">جودة عالية</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gold transition-colors line-clamp-2">{material.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{material.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Link href="/materials" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
            <span>عرض جميع المواد</span>
            <FaArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}