import React from 'react';
import { FaBuilding, FaPaintRoller, FaTools } from 'react-icons/fa';

export default function TypesSection() {
  return (
    <section id="types" className="py-20 bg-white/90 dark:bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">خدماتنا وأنواع المقاولات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* خدمة 1 */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
            <div className="text-4xl text-yellow-500 mb-4 flex justify-center"><FaBuilding /></div>
            <h3 className="text-xl font-bold text-center mb-3">بناء عظم</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">تنفيذ الهياكل الخرسانية والمباني السكنية والتجارية بأعلى معايير الجودة الهندسية.</p>
          </div>
          
          {/* خدمة 2 */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
            <div className="text-4xl text-yellow-500 mb-4 flex justify-center"><FaPaintRoller /></div>
            <h3 className="text-xl font-bold text-center mb-3">تشطيبات متكاملة</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">أعمال اللياسة، الدهانات، السباكة، والكهرباء وتسليم مفتاح بتصاميم عصرية.</p>
          </div>

          {/* خدمة 3 */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow bg-white dark:bg-gray-900">
            <div className="text-4xl text-yellow-500 mb-4 flex justify-center"><FaTools /></div>
            <h3 className="text-xl font-bold text-center mb-3">ترميم وصيانة</h3>
            <p className="text-center text-gray-600 dark:text-gray-300">إعادة تأهيل المباني القديمة وتجديد الواجهات وإصلاح المشاكل الإنشائية.</p>
          </div>
        </div>
      </div>
    </section>
  );
}