'use client';

import { useEffect, useState } from 'react';
import { FaCheckCircle, FaEdit, FaSave, FaBullseye } from 'react-icons/fa';

export default function CompanyObjectives() {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchObjectives();
  }, []);

  const fetchObjectives = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        const objs = [];
        for (let i = 1; i <= 6; i++) {
          const key = `objective_${i}`;
          if (data[key]) {
            objs.push({ id: i, key, value: data[key] });
          }
        }
        setObjectives(objs);
      }
    } catch (error) {
      console.error('Error fetching objectives:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (objective) => {
    setEditingId(objective.id);
    setEditValue(objective.value);
  };

  const handleSave = async (key) => {
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
        setObjectives((prev) =>
          prev.map((obj) =>
            obj.key === key ? { ...obj, value: editValue } : obj
          )
        );
        setEditingId(null);
        setEditValue('');
      }
    } catch (error) {
      console.error('Error saving objective:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl">
          <FaBullseye className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">أهداف الشركة</h2>
          <p className="text-gray-400 mt-1">إدارة أهداف ورؤية الشركة الاستراتيجية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {objectives.map((objective, index) => (
          <div
            key={objective.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gold text-black font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                {editingId === objective.id ? (
                  <div className="space-y-4">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
                      rows="3"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSave(objective.key)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <FaSave className="w-4 h-4" />
                        حفظ
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-white text-lg leading-relaxed mb-4">
                      {objective.value}
                    </p>
                    <button
                      onClick={() => handleEdit(objective)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                      تعديل
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {objectives.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">لم يتم العثور على أهداف</p>
        </div>
      )}
    </div>
  );
}
