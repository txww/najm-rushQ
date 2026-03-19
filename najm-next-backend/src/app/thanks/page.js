import Link from 'next/link';
import { HiOutlineMailOpen } from 'react-icons/hi';

export const metadata = {
  title: 'تم الإرسال | نجم راش للمقاولات',
  description: 'تم إرسال رسالتك بنجاح. شكراً لتواصلك معنا.',
  robots: 'noindex, nofollow',
};

export default function ThanksPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 px-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-10 text-center shadow-2xl">
        <div className="mb-6">
          <HiOutlineMailOpen className="text-[var(--brand-gold,#C28A17)] text-6xl mx-auto" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--brand-text,#0B1A2B)] dark:text-white mb-3">
          تم إرسال رسالتك بنجاح
        </h1>

        <p className="text-[var(--brand-text,#0B1A2B)] dark:text-gray-300 text-sm md:text-base mb-6">
          شكرًا لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت ممكن عبر البريد
          الإلكتروني.
        </p>

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:brightness-105 transition"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
