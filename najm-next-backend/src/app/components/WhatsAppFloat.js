'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaTimes, FaComments } from 'react-icons/fa';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({});

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
    }
  };

  const whatsappNumber = settings.whatsapp_number ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '+963984966818';

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('مرحباً، أريد استفسار عن خدماتكم')}`;

  const quickActions = [
    {
      title: 'استشارة فورية',
      message: 'مرحباً، أريد استشارة فورية حول مشروعي',
      icon: '💬'
    },
    {
      title: 'عرض أسعار',
      message: 'أريد الحصول على عرض أسعار لمشروع',
      icon: '💰'
    },
    {
      title: 'متابعة مشروع',
      message: 'أريد متابعة حالة مشروعي',
      icon: '📋'
    },
    {
      title: 'زيارة ميدانية',
      message: 'أريد ترتيب زيارة ميدانية',
      icon: '🏗️'
    }
  ];

  const handleQuickAction = (message) => {
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Quick Actions Menu */}
        {isOpen && (
          <div className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 mb-4 min-w-[280px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">كيف يمكننا مساعدتك؟</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.message)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-green-50 rounded-xl transition-colors border border-gray-100"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{action.title}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/whatsapp"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 text-left hover:bg-blue-50 rounded-xl transition-colors border border-blue-100"
              >
                <FaComments className="text-blue-500" />
                <span className="text-sm font-medium text-blue-700">المزيد من الخيارات</span>
              </Link>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-label="تواصل عبر WhatsApp"
        >
          <FaWhatsapp className="text-xl absolute inset-0 m-auto" />

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

