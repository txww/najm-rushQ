'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaStar } from 'react-icons/fa';

export default function CustomersManager() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    rating: 5,
    text: '',
    project: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async () => {
    if (!formData.name.trim() || !formData.text.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCustomer = await response.json();
        setCustomers([newCustomer, ...customers]);
        setFormData({
          name: '',
          position: '',
          company: '',
          rating: 5,
          text: '',
          project: '',
        });
        setShowForm(false);
        alert('تم إضافة رأي العميل بنجاح!');
      } else {
        alert('حدث خطأ في الإضافة');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('حدث خطأ في الإضافة: ' + error.message);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      const response = await fetch(`/api/customers/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCustomers(
          customers.map((c) =>
            c.id === editingId ? { ...c, ...formData } : c
          )
        );
        setEditingId(null);
        setFormData({
          name: '',
          position: '',
          company: '',
          rating: 5,
          text: '',
          project: '',
        });
        alert('تم تحديث رأي العميل بنجاح!');
      } else {
        alert('حدث خطأ في التحديث');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('حدث خطأ في التحديث: ' + error.message);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا العميل؟')) return;

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCustomers(customers.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('حدث خطأ في الحذف');
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      position: customer.position,
      company: customer.company || '',
      rating: customer.rating || 5,
      text: customer.text,
      project: customer.project || '',
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      name: '',
      position: '',
      company: '',
      rating: 5,
      text: '',
      project: '',
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
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
        <h3 className="text-2xl font-bold text-white">إدارة العملاء</h3>
        {!editingId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            عميل جديد
          </button>
        )}
      </div>

      {(showForm || editingId) && (
        <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                الاسم الكامل *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="مثال: أحمد محمد"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                المنصب/الوظيفة *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="مثال: مدير مشاريع"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                الشركة
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="مثال: شركة البناء الحديث"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                التقييم (1-5 نجوم)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              >
                <option value={5}>5 نجوم</option>
                <option value={4}>4 نجوم</option>
                <option value={3}>3 نجوم</option>
                <option value={2}>2 نجوم</option>
                <option value={1}>نجمة واحدة</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              المشروع
            </label>
            <input
              type="text"
              value={formData.project}
              onChange={(e) => setFormData({ ...formData, project: e.target.value })}
              className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="مثال: تشطيب فيلا 500م²"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              الشهادة/الرأي *
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
              placeholder="اكتب رأي العميل هنا..."
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
              onClick={editingId ? handleUpdateCustomer : handleAddCustomer}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <FaSave className="w-4 h-4" />
              {editingId ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gold/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gold">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{customer.name}</h4>
                  <p className="text-gray-400 text-sm">{customer.position}</p>
                  {customer.company && (
                    <p className="text-gray-500 text-xs">{customer.company}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(customer.rating)}
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              "{customer.text}"
            </p>

            {customer.project && (
              <div className="mb-4 pb-4 border-b border-gray-700">
                <p className="text-gold text-sm font-medium">
                  المشروع: {customer.project}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(customer)}
                className="flex-1 px-3 py-2 bg-blue-600/20 border border-blue-600/50 text-blue-400 hover:text-blue-300 hover:border-blue-400 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2"
              >
                <FaEdit className="w-4 h-4" />
                تعديل
              </button>
              <button
                onClick={() => handleDeleteCustomer(customer.id)}
                className="flex-1 px-3 py-2 bg-red-600/20 border border-red-600/50 text-red-400 hover:text-red-300 hover:border-red-400 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2"
              >
                <FaTrash className="w-4 h-4" />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {customers.length === 0 && !showForm && !editingId && (
        <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-dashed border-gray-600">
          <p className="text-gray-400 text-lg mb-4">لا يوجد عملاء حالياً</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            أضف أول عميل
          </button>
        </div>
      )}
    </div>
  );
}
