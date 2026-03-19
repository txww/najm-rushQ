// src/pages/ContactPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/thanks');
      } else {
        setError('حدث خطأ أثناء الإرسال، حاول لاحقاً.');
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء الاتصال بالخادم.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-12 py-20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-[var(--brand-gold,#C28A17)] mb-4">
          تواصل معنا
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          يسعدنا استلام رسالتك! املأ النموذج أدناه وسنقوم بالرد عليك في أسرع
          وقت.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* الحقول */}
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            required
            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold,#C28A17)] transition"
          />

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            required
            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold,#C28A17)] transition"
          />

          <textarea
            name="message"
            placeholder="اكتب رسالتك..."
            rows="5"
            required
            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-slate-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold,#C28A17)] transition"
          ></textarea>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className={`px-6 py-3 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-yellow-500 to-yellow-600 hover:brightness-105 transition disabled:opacity-60`}
            disabled={submitting}
          >
            {submitting ? 'جاري الإرسال...' : 'إرسال'}
          </button>
        </form>
      </div>
    </div>
  );
}
