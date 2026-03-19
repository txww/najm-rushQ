'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaCubes,
  FaProjectDiagram,
  FaPlus,
  FaList,
  FaCog,
  FaUsers,
  FaEnvelope,
  FaChartLine,
  FaCalendarAlt,
  FaEye,
  FaStar,
  FaPhone,
  FaGlobe,
  FaEdit,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    materials: 0,
    projects: 0,
    products: 0,
    messages: 0,
    views: 0,
    rating: 0
  });
  const [quickSettings, setQuickSettings] = useState({
    company_name: '',
    phone: '',
    email: '',
    facebook_url: '',
    whatsapp_number: '',
  });

  useEffect(() => {
    if (localStorage.getItem('admin') !== 'true') {
      router.push('/admin');
    }
    fetchStats();
    fetchQuickSettings();
  }, []);

  const fetchQuickSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        setQuickSettings({
          company_name: data.company_name || '',
          phone: data.phone || '',
          email: data.email || '',
          facebook_url: data.facebook_url || '',
          whatsapp_number: data.whatsapp_number || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const materialsRes = await fetch('/api/materials');
      const materials = await materialsRes.json();
      const projectsRes = await fetch('/api/projects');
      const projects = await projectsRes.json();
      // حساب إجمالي المنتجات
      const totalProducts = materials.reduce((sum, material) => sum + material.products.length, 0);

      setStats({
        materials: materials.length,
        projects: projects.length,
        products: totalProducts,
        messages: 0, // يمكن إضافة API للرسائل لاحقاً
        views: Math.floor(Math.random() * 10000) + 5000, // مؤقت
        rating: 4.8 // مؤقت
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              لوحة التحكم الإدارية
            </h1>
            <p className="text-gray-400 mt-2">مرحباً بك في نظام إدارة موقع نجم رش</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            خروج
          </button>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-100">المواد</h3>
                <p className="text-4xl font-bold text-white mt-2">{stats.materials}</p>
              </div>
              <FaCubes className="text-5xl text-blue-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-100">المشاريع</h3>
                <p className="text-4xl font-bold text-white mt-2">{stats.projects}</p>
              </div>
              <FaProjectDiagram className="text-5xl text-green-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-100">المنتجات</h3>
                <p className="text-4xl font-bold text-white mt-2">{stats.products}</p>
              </div>
              <FaUsers className="text-5xl text-purple-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-orange-100">الرسائل</h3>
                <p className="text-4xl font-bold text-white mt-2">{stats.messages}</p>
              </div>
              <FaEnvelope className="text-5xl text-orange-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-teal-100">المشاهدات</h3>
                <p className="text-4xl font-bold text-white mt-2">{stats.views.toLocaleString()}</p>
              </div>
              <FaEye className="text-5xl text-teal-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-pink-100">التقييم</h3>
                <p className="text-4xl font-bold text-white mt-2">{stats.rating}/5</p>
              </div>
              <FaStar className="text-5xl text-pink-200 opacity-80" />
            </div>
          </div>
        </div>

        {/* إعدادات سريعة مهمة */}
        <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 p-8 rounded-2xl shadow-2xl border border-indigo-700 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FaEdit className="mr-3 text-gold" />
            الإعدادات الأساسية السريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-indigo-700 p-4 rounded-lg hover:bg-indigo-600 transition-colors">
              <div className="flex items-center mb-2">
                <FaGlobe className="text-gold text-lg mr-2" />
                <label className="text-indigo-200 text-sm font-semibold">اسم الشركة</label>
              </div>
              <p className="text-white font-semibold text-sm">{quickSettings.company_name}</p>
            </div>
            <div className="bg-indigo-700 p-4 rounded-lg hover:bg-indigo-600 transition-colors">
              <div className="flex items-center mb-2">
                <FaPhone className="text-gold text-lg mr-2" />
                <label className="text-indigo-200 text-sm font-semibold">الهاتف</label>
              </div>
              <p className="text-white font-semibold text-sm">{quickSettings.phone}</p>
            </div>
            <div className="bg-indigo-700 p-4 rounded-lg hover:bg-indigo-600 transition-colors">
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-gold text-lg mr-2" />
                <label className="text-indigo-200 text-sm font-semibold">البريد الإلكتروني</label>
              </div>
              <p className="text-white font-semibold text-xs">{quickSettings.email}</p>
            </div>
            <div className="bg-indigo-700 p-4 rounded-lg hover:bg-indigo-600 transition-colors">
              <div className="flex items-center mb-2">
                <FaUsers className="text-gold text-lg mr-2" />
                <label className="text-indigo-200 text-sm font-semibold">واتساب</label>
              </div>
              <p className="text-white font-semibold text-sm">{quickSettings.whatsapp_number}</p>
            </div>
            <Link
              href="/admin/settings"
              className="bg-gold hover:bg-yellow-400 text-black p-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 col-span-1"
            >
              <FaCog className="text-lg" />
              <span>تعديل كل الإعدادات</span>
            </Link>
          </div>
        </div>

        {/* روابط الإدارة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            href="/admin/materials"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors">إدارة المواد</h3>
                <p className="text-gray-400 mt-1">عرض وتعديل جميع المواد</p>
              </div>
              <FaList className="text-3xl text-gold group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          <Link
            href="/admin/materials/new"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors">إضافة مادة جديدة</h3>
                <p className="text-gray-400 mt-1">إنشاء مادة جديدة في النظام</p>
              </div>
              <FaPlus className="text-3xl text-gold group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          <Link
            href="/admin/projects"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors">إدارة المشاريع</h3>
                <p className="text-gray-400 mt-1">عرض وإدارة المشاريع</p>
              </div>
              <FaProjectDiagram className="text-3xl text-gold group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          <Link
            href="/admin/projects/new"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors">إضافة مشروع جديد</h3>
                <p className="text-gray-400 mt-1">إنشاء مشروع جديد</p>
              </div>
              <FaPlus className="text-3xl text-gold group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          <Link
            href="/admin/settings"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors">إعدادات الموقع</h3>
                <p className="text-gray-400 mt-1">تخصيص إعدادات الموقع</p>
              </div>
              <FaCog className="text-3xl text-gold group-hover:scale-110 transition-transform" />
            </div>
          </Link>
          <Link
            href="/admin/reports"
            className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors">التقارير والإحصائيات</h3>
                <p className="text-gray-400 mt-1">تحليلات مفصلة لأداء الموقع</p>
              </div>
              <FaChartLine className="text-3xl text-gold group-hover:scale-110 transition-transform" />
            </div>
          </Link>
        </div>

        {/* نشاط حديث */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FaCalendarAlt className="mr-3 text-gold" />
            النشاط الحديث
          </h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-white">تم تحديث إعدادات الموقع</p>
                <p className="text-gray-400 text-sm">منذ 2 ساعات</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-white">تم إضافة مشروع جديد</p>
                <p className="text-gray-400 text-sm">منذ يوم واحد</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-700 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-white">تم تحديث قائمة المواد</p>
                <p className="text-gray-400 text-sm">منذ 3 أيام</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
