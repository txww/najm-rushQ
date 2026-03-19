// src/pages/WhatsAppPage.jsx
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">
        تواصل عبر واتساب
      </h1>
      <p className="text-gray-300 mb-6">اضغط أدناه لفتح المحادثة</p>
      <a
        href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER || '123456789'}?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدماتكم')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-green-600 px-6 py-3 rounded text-white"
      >
        <FaWhatsapp /> افتح المحادثة
      </a>
    </div>
  );
}
