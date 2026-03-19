import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const WA_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '123456789';
  const MESSAGE = 'مرحبًا، أرغب في معرفة تفاصيل خدماتكم';

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition transform hover:scale-110 z-50"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  );
}
