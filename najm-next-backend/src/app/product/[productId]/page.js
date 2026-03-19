import ProductContent from '../../components/ProductContent';

export const metadata = {
  title: 'تفاصيل المنتج | نجم راش للمقاولات',
  description: 'معلومات مفصلة عن منتجات البناء والتشطيب عالية الجودة.',
  keywords: ['منتج', 'تفاصيل', 'بناء', 'تشطيب', 'جودة'],
};

export default function ProductPage({ params }) {
  return <ProductContent params={params} />;
}
