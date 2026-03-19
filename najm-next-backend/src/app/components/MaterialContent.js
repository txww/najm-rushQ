'use client';

// src/pages/MaterialPage.jsx
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { getMaterials } from '../data/materials';

export default function MaterialContent({ params }) {
  const { id } = params;
  const mid = parseInt(id);
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  const fetchMaterial = async () => {
    try {
      setLoading(true);
      setError(null);
      // Try to fetch from API first
      const response = await fetch(`/api/materials/${mid}`);
      if (response.ok) {
        const data = await response.json();
        setMaterial(data);
      } else {
        // Fallback to static data
        const allMaterials = await getMaterials();
        const found = allMaterials.find((m) => m.id === mid);
        setMaterial(found || null);
      }
    } catch (err) {
      console.error('Error fetching material:', err);
      // Fallback to static data
      try {
        const allMaterials = await getMaterials();
        const found = allMaterials.find((m) => m.id === mid);
        setMaterial(found || null);
      } catch (fallbackErr) {
        setError('فشل في جلب بيانات القسم');
      }
    } finally {
      setLoading(false);
    }
  };


  const [q, setQ] = useState('');
  const norm = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!material) return [];
    return material.products.filter((p) => {
      return (
        (p.name || '').toLowerCase().includes(norm) ||
        (p.description || '').toLowerCase().includes(norm)
      );
    });
  }, [material, norm]);

  if (loading) return <div className="text-center mt-20 text-xl">جاري التحميل...</div>;

  if (error)
    return (
      <h2 className="text-center mt-20 text-3xl font-bold text-red-500">
        {error}
      </h2>
    );

  if (!material)
    return (
      <h2 className="text-center mt-20 text-3xl font-bold text-[var(--brand-gold,#C28A17)]">
        القسم غير موجود
      </h2>
    );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* عنوان القسم */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-[var(--brand-gold,#C28A17)]">
          {material.name}
        </h1>
        <p className="text-gray-300 mt-2 max-w-2xl">{material.description}</p>
      </div>

      {/* البحث */}
      <div className="max-w-md mx-auto mb-10">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث عن منتج..."
          className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold,#C28A17)] transition"
        />
      </div>

      {/* قائمة المنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length ? (
          filtered.map((p) => (
            <article
              key={p.id}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-2xl hover:-translate-y-1 duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow gap-3">
                <h3 className="text-xl font-bold text-[var(--brand-gold,#C28A17)]">
                  {p.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 flex-grow">
                  {p.description}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <Link
                    href={`/product/${p.id}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold shadow-md hover:brightness-105 transition"
                  >
                    تفاصيل المنتج
                  </Link>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '123456789'}?text=${encodeURIComponent(`أريد تفاصيل عن ${p.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    اطلب عبر واتساب
                  </a>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            لا توجد منتجات مطابقة "{q}"
          </p>
        )}
      </div>
    </div>
  );
}
