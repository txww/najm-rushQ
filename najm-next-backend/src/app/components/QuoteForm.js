'use client';
import { useState } from 'react';

export default function QuoteForm() {
  const [form, setForm] = useState({ name: '', phone: '', details: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    const text = `طلب عرض سعر من ${form.name} - ${form.phone}: ${form.details}`;
    const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '123456789';

    window.open(
      `https://wa.me/${wa}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setSent(true);
    setForm({ name: '', phone: '', details: '' });
  };

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="card p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-[var(--brand-text,#0B1A2B)] mb-3">
          طلب عرض سعر سريع
        </h3>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="الاسم الكامل"
              className="w-full p-3 rounded bg-white/6 text-white"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="رقم الهاتف"
              className="w-full p-3 rounded bg-white/6 text-white"
            />
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="ملخص المشروع (اختياري)"
              rows="4"
              className="w-full p-3 rounded bg-white/6 text-white"
            />
            <div className="flex gap-3">
              <button type="submit" className="btn-cta">
                أرسل عبر واتساب
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({ name: '', phone: '', details: '' });
                }}
                className="btn-ghost"
              >
                إعادة تعيين
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="font-semibold text-[var(--brand-text,#0B1A2B)]">
              تم إرسال طلبك بنجاح. سنتواصل معك قريباً.
            </p>
            <button onClick={() => setSent(false)} className="mt-4 btn-ghost">
              أرسل طلب آخر
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
