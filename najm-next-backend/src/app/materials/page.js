import MaterialsSection from '../components/MaterialsSection';
import Footer from '../components/Footer';

export const metadata = {
  title: 'المواد | نجم راش للمقاولات',
  description:
    'اكتشف مجموعتنا الواسعة من المواد عالية الجودة لمشاريعك الإنشائية والتشطيبية',
  keywords: [
    'مواد بناء',
    'مواد تشطيب',
    'مغاسل',
    'بديل خشب',
    'مطابخ',
    'أسقف',
    'أبواب',
    'رخام',
    'نجم راش',
  ],
};

export default function MaterialsPage() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            موادنا المتميزة
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            مجموعة شاملة من أفضل المواد والمنتجات عالية الجودة لجميع احتياجات
            مشاريعك
          </p>
        </div>
      </section>

      {/* Materials Section */}
      <MaterialsSection />

      <Footer />
    </main>
  );
}
