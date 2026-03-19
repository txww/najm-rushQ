'use client';

import { useState, useEffect } from 'react';
import {
  FaSave,
  FaEdit,
  FaCheck,
  FaTimes,
  FaPlus,
  FaTrash,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function SettingsManager() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newSetting, setNewSetting] = useState({
    key: '',
    value: '',
    category: 'content',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // تحميل الإعدادات
  useEffect(() => {
    fetchSettings();
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
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (key, value) => {
    setEditing(key);
    setEditValue(value);
  };

  const handleCancel = () => {
    setEditing(null);
    setEditValue('');
  };

  const handleSave = async (key) => {
    setSaving(true);
    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          value: editValue,
        }),
      });

      if (response.ok) {
        setSettings((prev) => ({
          ...prev,
          [key]: editValue,
        }));
        setEditing(null);
        setEditValue('');
      } else {
        alert('فشل في حفظ الإعداد');
      }
    } catch (error) {
      console.error('Error saving setting:', error);
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const getCategoryName = (category) => {
    const categories = {
      contact: 'معلومات الاتصال',
      social: 'وسائل التواصل الاجتماعي',
      branding: 'العلامة التجارية',
      content: 'المحتوى',
      seo: 'تحسين محركات البحث',
      analytics: 'التحليلات',
      business: 'معلومات العمل',
    };
    return categories[category] || category;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      contact: <FaPhone className="w-5 h-5" />,
      social: <FaFacebook className="w-5 h-5" />,
      branding: <FaGlobe className="w-5 h-5" />,
      content: <FaEdit className="w-5 h-5" />,
      seo: <FaGlobe className="w-5 h-5" />,
      analytics: <FaGlobe className="w-5 h-5" />,
      business: <FaMapMarkerAlt className="w-5 h-5" />,
    };
    return icons[category] || <FaEdit className="w-5 h-5" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      contact: 'bg-blue-100 text-blue-800 border-blue-200',
      social: 'bg-purple-100 text-purple-800 border-purple-200',
      branding: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      content: 'bg-green-100 text-green-800 border-green-200',
      seo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      analytics: 'bg-pink-100 text-pink-800 border-pink-200',
      business: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleAddSetting = async () => {
    if (!newSetting.key.trim() || !newSetting.value.trim()) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/site-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSetting),
      });

      if (response.ok) {
        const result = await response.json();
        setSettings((prev) => ({
          ...prev,
          [newSetting.key]: newSetting.value,
        }));
        setNewSetting({ key: '', value: '', category: 'content' });
        setShowAddForm(false);
      } else {
        alert('فشل في إضافة الإعداد');
      }
    } catch (error) {
      console.error('Error adding setting:', error);
      alert('حدث خطأ أثناء الإضافة');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSetting = async (key) => {
    if (!confirm('هل أنت متأكد من حذف هذا الإعداد؟')) {
      return;
    }

    try {
      // يمكن إضافة API endpoint لحذف الإعدادات لاحقاً
      // الآن سنقوم بتعيين القيمة فارغة
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          value: '',
        }),
      });

      if (response.ok) {
        setSettings((prev) => {
          const newSettings = { ...prev };
          delete newSettings[key];
          return newSettings;
        });
      } else {
        alert('فشل في حذف الإعداد');
      }
    } catch (error) {
      console.error('Error deleting setting:', error);
      alert('حدث خطأ أثناء الحذف');
    }
  };

  const groupedSettings = Object.entries(settings).reduce(
    (acc, [key, value]) => {
      // تصنيف محسن بناءً على المفتاح
      let category = 'content';

      // وسائل التواصل الاجتماعي
      if (
        key.includes('facebook') ||
        key.includes('instagram') ||
        key.includes('twitter') ||
        key.includes('linkedin') ||
        key.includes('youtube') ||
        key.includes('tiktok') ||
        key.includes('snapchat') ||
        key.includes('telegram')
      ) {
        category = 'social';
      }
      // معلومات الاتصال
      else if (
        key.includes('whatsapp') ||
        key.includes('email') ||
        key.includes('phone') ||
        key.includes('address') ||
        key.includes('contact')
      ) {
        category = 'contact';
      }
      // العلامة التجارية
      else if (
        key.includes('company') ||
        key.includes('logo') ||
        key.includes('brand') ||
        key.includes('slogan') ||
        key.includes('mission') ||
        key.includes('vision')
      ) {
        category = 'branding';
      }
      // تحسين محركات البحث
      else if (
        key.includes('meta') ||
        key.includes('seo') ||
        key.includes('title') ||
        key.includes('description') ||
        key.includes('keywords')
      ) {
        category = 'seo';
      }
      // التحليلات
      else if (
        key.includes('google_analytics') ||
        key.includes('facebook_pixel') ||
        key.includes('tracking')
      ) {
        category = 'analytics';
      }
      // معلومات العمل
      else if (
        key.includes('business') ||
        key.includes('license') ||
        key.includes('registration') ||
        key.includes('tax') ||
        key.includes('working_hours')
      ) {
        category = 'business';
      }
      // hero و footer تذهب لـ content

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ key, value });
      return acc;
    },
    {}
  );

  return loading ? (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  ) : (
    <div className="space-y-8">
      {/* إضافة إعداد جديد */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            إضافة إعداد جديد
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaPlus className="ml-2" />
            إضافة إعداد
          </button>
        </div>

        {showAddForm && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  اسم الإعداد (مفتاح)
                </label>
                <input
                  type="text"
                  value={newSetting.key}
                  onChange={(e) =>
                    setNewSetting((prev) => ({ ...prev, key: e.target.value }))
                  }
                  placeholder="مثال: facebook_url"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  القيمة
                </label>
                <input
                  type="text"
                  value={newSetting.value}
                  onChange={(e) =>
                    setNewSetting((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                  placeholder="مثال: https://facebook.com/najmrush"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الفئة
                </label>
                <select
                  value={newSetting.category}
                  onChange={(e) =>
                    setNewSetting((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="contact">معلومات الاتصال</option>
                  <option value="social">وسائل التواصل الاجتماعي</option>
                  <option value="branding">العلامة التجارية</option>
                  <option value="content">المحتوى</option>
                  <option value="seo">تحسين محركات البحث</option>
                  <option value="analytics">التحليلات</option>
                  <option value="business">معلومات العمل</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddSetting}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'جاري الحفظ...' : 'إضافة'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ملخص الإعدادات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(groupedSettings).map(([category, categorySettings]) => (
          <div
            key={category}
            className={`rounded-lg p-4 border ${getCategoryColor(category)}`}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3">{getCategoryIcon(category)}</div>
              <div>
                <div className="text-2xl font-bold">
                  {categorySettings.length}
                </div>
                <div className="text-sm opacity-75">
                  {getCategoryName(category)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* الفئات */}
      {Object.entries(groupedSettings).map(([category, categorySettings]) => (
        <div
          key={category}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div
                className={`p-2 rounded-lg mr-3 ${getCategoryColor(category)}`}
              >
                {getCategoryIcon(category)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getCategoryName(category)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {categorySettings.length} إعدادات
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categorySettings.map(({ key, value }) => (
              <div
                key={key}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      {key
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </div>
                    {editing === key ? (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          disabled={saving}
                        />
                        <button
                          onClick={() => handleSave(key)}
                          disabled={saving}
                          className="p-2 text-green-600 hover:text-green-800 disabled:opacity-50"
                          title="حفظ"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={saving}
                          className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                          title="إلغاء"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-md">
                        {value || (
                          <span className="text-gray-400 italic">فارغ</span>
                        )}
                      </div>
                    )}
                  </div>

                  {editing !== key && (
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(key, value)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                        title="تعديل"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteSetting(key)}
                        className="p-2 text-red-600 hover:text-red-800"
                        title="حذف"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
