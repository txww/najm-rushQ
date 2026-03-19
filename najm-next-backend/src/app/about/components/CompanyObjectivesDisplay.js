'use client';

import { useEffect, useState } from 'react';
import { FaCheckCircle, FaBullseye, FaHeart, FaRocket } from 'react-icons/fa';

export default function CompanyObjectivesDisplay() {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getIcon = (index) => {
    const icons = [
      <FaBullseye key="target" className="w-6 h-6" />,
      <FaCheckCircle key="check" className="w-6 h-6" />,
      <FaRocket key="rocket" className="w-6 h-6" />,
      <FaHeart key="heart" className="w-6 h-6" />,
      <FaCheckCircle key="check2" className="w-6 h-6" />,
      <FaRocket key="rocket2" className="w-6 h-6" />,
    ];
    return icons[index] || icons[0];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {objectives.map((objective, index) => (
        <div
          key={objective.id}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 hover:border-gold/50 transition-all duration-500 transform group-hover:-translate-y-2">
            {/* Number Badge */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg">
              {index + 1}
            </div>

            {/* Icon */}
            <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
              {getIcon(index)}
            </div>

            {/* Content */}
            <p className="text-gray-100 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
              {objective.value}
            </p>

            {/* Decorative Line */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold to-transparent rounded-b-2xl w-0 group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
