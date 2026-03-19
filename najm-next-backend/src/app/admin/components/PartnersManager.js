'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaLink } from 'react-icons/fa';

export default function PartnersManager() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      if (response.ok) {
        const data = await response.json();
        setPartners(data);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPartner = async () => {
    if (!formData.name.trim()) {
      alert('يرجى إدخال اسم الشريك');
      return;
    }

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPartner = await response.json();
        setPartners([...partners, newPartner]);
        setFormData({ name: '', website: '' });
        setShowForm(false);
        alert('تم إضافة الشريك بنجاح!');
      } else {
        alert('حدث خطأ في الإضافة');
      }
    } catch (error) {
      console.error('Error adding partner:', error);
      alert('حدث خطأ في الإضافة: ' + error.message);
    }
  };

  const handleUpdatePartner = async () => {
    try {
      const response = await fetch(`/api/partners/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setPartners(
          partners.map((p) =>
            p.id === editingId ? { ...p, ...formData } : p
          )
        );
        setEditingId(null);
        setFormData({ name: '', website: '' });
        alert('تم تحديث الشريك بنجاح!');
      } else {
        alert('حدث خطأ في التحديث');
      }
    } catch (error) {
      console.error('Error updating partner:', error);
      alert('حدث خطأ في التحديث: ' + error.message);
    }
  };

  const handleDeletePartner = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الشريك؟')) return;

    try {
      const response = await fetch(`/api/partners/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPartners(partners.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
      alert('حدث خطأ في الحذف');
    }
  };

  const handleEdit = (partner) => {
    setEditingId(partner.id);
    setFormData({
      name: partner.name,
      website: partner.website || '',
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({ name: '', website: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">إدارة الشركاء</h3>
        {!editingId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            شريك جديد
          </button>
        )}
      </div>

      {(showForm || editingId) && (
        <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                اسم الشريك *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="مثال: شركة الخدمات المتقدمة"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                الموقع الإلكتروني
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="https://example.com"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={editingId ? handleUpdatePartner : handleAddPartner}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <FaSave className="w-4 h-4" />
              {editingId ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-white font-semibold text-lg flex-1">{partner.name}</h4>
              <div className="text-2xl ml-2">🤝</div>
            </div>
            
            {partner.website && (
              <div className="mb-4 pb-4 border-b border-gray-700">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-yellow-300 transition-colors text-sm"
                >
                  <FaLink className="w-3 h-3" />
                  <span className="truncate">{partner.website}</span>
                </a>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(partner)}
                className="flex-1 px-3 py-2 bg-blue-600/20 border border-blue-600/50 text-blue-400 hover:text-blue-300 hover:border-blue-400 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2"
              >
                <FaEdit className="w-4 h-4" />
                تعديل
              </button>
              <button
                onClick={() => handleDeletePartner(partner.id)}
                className="flex-1 px-3 py-2 bg-red-600/20 border border-red-600/50 text-red-400 hover:text-red-300 hover:border-red-400 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2"
              >
                <FaTrash className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {partners.length === 0 && !showForm && !editingId && (
        <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-dashed border-gray-600">
          <p className="text-gray-400 text-lg mb-4">لا يوجد شركاء حالياً</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            أضف أول شريك
          </button>
        </div>
      )}
    </div>
  );
}
