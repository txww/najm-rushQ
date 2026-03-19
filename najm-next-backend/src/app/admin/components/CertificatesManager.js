'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates');
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertificate = async () => {
    if (!formData.title.trim() || !formData.organization.trim()) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCert = await response.json();
        setCertificates([...certificates, newCert]);
        setFormData({ title: '', organization: '', year: new Date().getFullYear() });
        setShowForm(false);
        alert('تم إضافة الشهادة بنجاح!');
      } else {
        alert('حدث خطأ في الإضافة');
      }
    } catch (error) {
      console.error('Error adding certificate:', error);
      alert('حدث خطأ في الإضافة: ' + error.message);
    }
  };

  const handleUpdateCertificate = async () => {
    try {
      const response = await fetch(`/api/certificates/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCertificates(
          certificates.map((c) =>
            c.id === editingId ? { ...c, ...formData } : c
          )
        );
        setEditingId(null);
        setFormData({ title: '', organization: '', year: new Date().getFullYear() });
        alert('تم تحديث الشهادة بنجاح!');
      } else {
        alert('حدث خطأ في التحديث');
      }
    } catch (error) {
      console.error('Error updating certificate:', error);
      alert('حدث خطأ في التحديث: ' + error.message);
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه الشهادة؟')) return;

    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCertificates(certificates.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
      alert('حدث خطأ في الحذف');
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert.id);
    setFormData({
      title: cert.title,
      organization: cert.organization,
      year: cert.year,
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({ title: '', organization: '', year: new Date().getFullYear() });
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
        <h3 className="text-2xl font-bold text-white">إدارة الشهادات والجوائز</h3>
        {!editingId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            شهادة جديدة
          </button>
        )}
      </div>

      {(showForm || editingId) && (
        <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                اسم الشهادة
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                الجهة المانحة
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                السنة
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
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
              onClick={editingId ? handleUpdateCertificate : handleAddCertificate}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <FaSave className="w-4 h-4" />
              {editingId ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gold/50 transition-colors"
          >
            <h4 className="text-white font-semibold mb-2">{cert.title}</h4>
            <p className="text-gray-400 text-sm mb-2">{cert.organization}</p>
            <p className="text-gray-500 text-xs mb-4">السنة: {cert.year}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cert)}
                className="flex-1 p-2 text-blue-400 hover:text-blue-300 transition-colors"
                title="تعديل"
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCertificate(cert.id)}
                className="flex-1 p-2 text-red-400 hover:text-red-300 transition-colors"
                title="حذف"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && !showForm && !editingId && (
        <div className="text-center py-8 text-gray-400">
          <p>لا توجد شهادات حالياً.</p>
        </div>
      )}
    </div>
  );
}
