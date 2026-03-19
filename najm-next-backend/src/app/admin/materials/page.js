'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEdit, FaTrash, FaPlus, FaArrowLeft, FaCubes } from 'react-icons/fa';

export default function AdminMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('admin') !== 'true') {
      router.push('/admin');
    } else {
      fetchMaterials();
    }
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/materials');
      if (res.ok) {
        const data = await res.json();
        setMaterials(data);
      } else {
        alert('خطأ في جلب المواد: ' + res.status);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
      alert('خطأ في جلب المواد: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه المادة؟')) return;

    try {
      const res = await fetch(`/api/materials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('تم حذف المادة بنجاح!');
        fetchMaterials();
      } else {
        alert('خطأ في حذف المادة: ' + res.status);
      }
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('خطأ في حذف المادة: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl">
              <FaCubes className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                إدارة المواد
              </h1>
              <p className="text-gray-400 mt-2">عرض وتعديل جميع المواد والمنتجات</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/materials/new"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FaPlus className="ml-2" />
              مادة جديدة
            </Link>
            <Link
              href="/admin/dashboard"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FaArrowLeft className="ml-2" />
              العودة
            </Link>
          </div>
        </div>

        {/* Materials List */}
        {materials.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-12 text-center">
            <FaCubes className="text-6xl text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">لا توجد مواد حالياً</p>
            <Link
              href="/admin/materials/new"
              className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-gold to-yellow-400 text-black rounded-lg font-medium hover:shadow-lg transition"
            >
              إنشاء مادة جديدة
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{mat.name}</h2>
                    <p className="text-gray-400 line-clamp-2">{mat.description}</p>
                  </div>
                  {mat.image && (
                    <div className="ml-4 flex-shrink-0">
                      <img
                        src={mat.image}
                        alt={mat.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Products Count */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <p className="text-sm text-gray-400">
                    عدد المنتجات: <span className="text-gold font-semibold">{mat.products?.length || 0}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/admin/materials/${mat.id}`}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600/20 border border-blue-600/50 text-blue-400 hover:text-blue-300 hover:border-blue-400 rounded-lg font-medium transition-all"
                  >
                    <FaEdit className="ml-2" />
                    تعديل
                  </Link>
                  <button
                    onClick={() => handleDelete(mat.id)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600/20 border border-red-600/50 text-red-400 hover:text-red-300 hover:border-red-400 rounded-lg font-medium transition-all"
                  >
                    <FaTrash className="ml-2" />
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
