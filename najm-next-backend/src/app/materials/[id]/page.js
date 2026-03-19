import MaterialContent from '../../components/MaterialContent';

export const metadata = {
  title: 'قسم المواد | نجم راش للمقاولات',
  description: 'استعرض مجموعة واسعة من مواد البناء والتشطيب عالية الجودة.',
  keywords: ['مواد', 'بناء', 'تشطيب', 'جودة', 'نجم راش'],
};

export default function MaterialPage({ params }) {
  return <MaterialContent params={params} />;
}
