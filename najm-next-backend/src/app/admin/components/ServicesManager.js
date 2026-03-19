'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSave } from 'react-icons/fa';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '🔨',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newService = await response.json();
        setServices([...services, newService]);
        setFormData({ title: '', description: '', icon: '🔨' });
        setShowForm(false);
        alert('تم إضافة الخدمة بنجاح!');
      } else {
        alert('حدث خطأ في الإضافة');
      }
    } catch (error) {
      console.error('Error adding service:', error);
      alert('حدث خطأ في الإضافة: ' + error.message);
    }
  };

  const handleUpdateService = async () => {
    try {
      const response = await fetch(`/api/services/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setServices(
          services.map((s) =>
            s.id === editingId ? { ...s, ...formData } : s
          )
        );
        setEditingId(null);
        setFormData({ title: '', description: '', icon: '🔨' });
        alert('تم تحديث الخدمة بنجاح!');
      } else {
        alert('حدث خطأ في التحديث');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('حدث خطأ في التحديث: ' + error.message);
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('حدث خطأ في الحذف');
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({ title: '', description: '', icon: '🔨' });
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">إدارة الخدمات</h3>
        {!editingId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            خدمة جديدة
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(showForm || editingId) && (
        <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                الأيقونة
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                maxLength="2"
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                اسم الخدمة
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              وصف الخدمة
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={editingId ? handleUpdateService : handleAddService}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <FaSave className="w-4 h-4" />
              {editingId ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700 border-b border-gray-600">
            <tr>
              <th className="px-6 py-3 text-right text-white font-semibold">الأيقونة</th>
              <th className="px-6 py-3 text-right text-white font-semibold">اسم الخدمة</th>
              <th className="px-6 py-3 text-right text-white font-semibold">الوصف</th>
              <th className="px-6 py-3 text-center text-white font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {services.map((service) => (
              <tr key={service.id} className="bg-gray-800 hover:bg-gray-750 transition-colors">
                <td className="px-6 py-3 text-2xl">{service.icon}</td>
                <td className="px-6 py-3 text-white font-medium">{service.title}</td>
                <td className="px-6 py-3 text-gray-300 text-sm max-w-xs truncate">
                  {service.description}
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(service)}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="تعديل"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="حذف"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {services.length === 0 && !showForm && !editingId && (
        <div className="text-center py-8 text-gray-400">
          <p>لا توجد خدمات حالياً. اضغط على "خدمة جديدة" لإضافة خدمة.</p>
        </div>
      )}
    </div>
  );
}
