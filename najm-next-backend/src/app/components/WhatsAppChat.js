'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+963984966818';

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);

  // إغلاق عند الضغط على ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // إغلاق عند الضغط خارج النافذة
  useEffect(() => {
    const onClickOutside = (e) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  // إرسال الرسالة
  const send = useCallback(() => {
    const text = msg.trim();
    if (!text) return;

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setMsg('');
    setOpen(false);
  }, [msg]);

  // تمرير تلقائي لأسفل المحادثة
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, msg]);

  return (
    <>
      {/* زر واتساب العائم */}
      <button
        aria-label={open ? 'إغلاق المحادثة' : 'فتح محادثة واتساب'}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed fab-safe bottom-6 right-6 bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-xl z-50 hover:scale-110 transition-transform"
        aria-expanded={open}
      >
        <FaWhatsapp className="w-6 h-6" />
      </button>

      {/* نافذة المحادثة */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="محادثة واتساب"
          className="fixed bottom-24 right-4 w-[360px] max-w-[92vw] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col animate-slide-up overflow-hidden z-50"
        >
          {/* رأس النافذة */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-bold text-black shadow">
                N
              </div>
              <div>
                <div className="font-bold text-black text-lg">شركة نجم راش</div>
                <div className="text-xs text-white/70">متصل الآن</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="إغلاق"
              className="text-white font-bold text-xl hover:text-black"
            >
              ✖
            </button>
          </div>

          {/* محتوى المحادثة */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
            <div className="bg-green-100 text-green-800 p-3 rounded-lg max-w-xs shadow">
              👋 مرحباً! كيف يمكننا مساعدتك؟
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* إدخال الرسالة */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="اكتب رسالتك..."
                aria-label="اكتب رسالتك"
                className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition"
              >
                <FaPaperPlane />
                <span className="hidden sm:inline">إرسال</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
