'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function ServicesPageManager() {
  const [content, setContent] = useState({
    heroTitle: 'خدماتنا المتكاملة',
    heroSubtitle: 'نقدم حلولاً شاملة في المقاولات والتطوير الإنشائي',
    mainDescription: 'اكتشف خدماتنا المتكاملة التي تغطي جميع جوانب المشاريع الإنشائية من التأسيس حتى التسليم النهائي.',
    ctaText: 'اطلب استشارة مجانية',
    ctaLink: '#contact',
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // في المستقبل يمكن إضافة API لجلب محتوى الصفحة
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // في المستقبل يمكن إضافة API لحفظ المحتوى
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة حفظ
      setEditing(false);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">إدارة صفحة الخدمات</h2>
          <p className="text-gray-400">تخصيص محتوى صفحة خدماتنا</p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaEdit className="ml-2" />
            تعديل المحتوى
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
              ) : (
                <FaSave className="ml-2" />
              )}
              حفظ
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FaTimes className="ml-2" />
              إلغاء
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">قسم البطل (Hero)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                العنوان الرئيسي
              </label>
              {editing ? (
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => setContent({...content, heroTitle: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-gold"
                />
              ) : (
                <p className="text-white bg-gray-600 px-4 py-3 rounded-lg">{content.heroTitle}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                العنوان الفرعي
              </label>
              {editing ? (
                <input
                  type="text"
                  value={content.heroSubtitle}
                  onChange={(e) => setContent({...content, heroSubtitle: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-gold"
                />
              ) : (
                <p className="text-white bg-gray-600 px-4 py-3 rounded-lg">{content.heroSubtitle}</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Description */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">الوصف الرئيسي</h3>
          {editing ? (
            <textarea
              value={content.mainDescription}
              onChange={(e) => setContent({...content, mainDescription: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-gold resize-none"
            />
          ) : (
            <p className="text-white bg-gray-600 px-4 py-3 rounded-lg">{content.mainDescription}</p>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">زر الدعوة للعمل (CTA)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                نص الزر
              </label>
              {editing ? (
                <input
                  type="text"
                  value={content.ctaText}
                  onChange={(e) => setContent({...content, ctaText: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-gold"
                />
              ) : (
                <p className="text-white bg-gray-600 px-4 py-3 rounded-lg">{content.ctaText}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رابط الزر
              </label>
              {editing ? (
                <input
                  type="text"
                  value={content.ctaLink}
                  onChange={(e) => setContent({...content, ctaLink: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-gold"
                />
              ) : (
                <p className="text-white bg-gray-600 px-4 py-3 rounded-lg">{content.ctaLink}</p>
              )}
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">إدارة الخدمات</h3>
          <p className="text-gray-300 mb-4">
            الخدمات تُدار من قسم "إدارة الخدمات" أعلاه. هنا يمكنك تخصيص كيفية عرضها في صفحة الخدمات.
          </p>
          <div className="bg-gray-600 rounded-lg p-4">
            <p className="text-gray-300 text-sm">
              <strong>ملاحظة:</strong> يتم جلب الخدمات تلقائياً من قاعدة البيانات. إذا لم تكن هناك خدمات، سيتم عرض الخدمات الافتراضية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}