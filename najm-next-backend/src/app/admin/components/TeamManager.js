'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';

export default function TeamManager() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/team');
      if (response.ok) {
        const data = await response.json();
        setTeam(data);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!formData.name.trim() || !formData.position.trim()) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newMember = await response.json();
        setTeam([...team, newMember]);
        setFormData({ name: '', position: '', bio: '', phone: '', email: '' });
        setShowForm(false);
        alert('تم إضافة العضو بنجاح!');
      } else {
        alert('حدث خطأ في الإضافة');
      }
    } catch (error) {
      console.error('Error adding member:', error);
      alert('حدث خطأ في الإضافة: ' + error.message);
    }
  };

  const handleUpdateMember = async () => {
    try {
      const response = await fetch(`/api/team/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTeam(
          team.map((m) =>
            m.id === editingId ? { ...m, ...formData } : m
          )
        );
        setEditingId(null);
        setFormData({ name: '', position: '', bio: '', phone: '', email: '' });
        alert('تم تحديث العضو بنجاح!');
      } else {
        alert('حدث خطأ في التحديث');
      }
    } catch (error) {
      console.error('Error updating member:', error);
      alert('حدث خطأ في التحديث: ' + error.message);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا العضو؟')) return;

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTeam(team.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('حدث خطأ في الحذف');
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      phone: member.phone || '',
      email: member.email || '',
    });
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({ name: '', position: '', bio: '', phone: '', email: '' });
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
        <h3 className="text-2xl font-bold text-white">إدارة الفريق</h3>
        {!editingId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-yellow-400 text-black rounded-lg font-medium transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            عضو جديد
          </button>
        )}
      </div>

      {(showForm || editingId) && (
        <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                المنصب/الوظيفة
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="مثال: 0980438576"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="example@domain.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              نبذة بسيطة
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows="2"
              className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded-lg focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
              placeholder="اختياري"
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
              onClick={editingId ? handleUpdateMember : handleAddMember}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <FaSave className="w-4 h-4" />
              {editingId ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700 border-b border-gray-600">
            <tr>
              <th className="px-6 py-3 text-right text-white font-semibold">الاسم</th>
              <th className="px-6 py-3 text-right text-white font-semibold">المنصب</th>
              <th className="px-6 py-3 text-right text-white font-semibold">الهاتف</th>
              <th className="px-6 py-3 text-right text-white font-semibold">البريد</th>
              <th className="px-6 py-3 text-center text-white font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {team.map((member) => (
              <tr key={member.id} className="bg-gray-800 hover:bg-gray-750 transition-colors">
                <td className="px-6 py-3 text-white font-medium">{member.name}</td>
                <td className="px-6 py-3 text-gray-300">{member.position}</td>
                <td className="px-6 py-3 text-gray-300">{member.phone || '-'}</td>
                <td className="px-6 py-3 text-gray-300">{member.email || '-'}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                      title="تعديل"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
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

      {team.length === 0 && !showForm && !editingId && (
        <div className="text-center py-8 text-gray-400">
          <p>لا يوجد أعضاء فريق حالياً.</p>
        </div>
      )}
    </div>
  );
}
