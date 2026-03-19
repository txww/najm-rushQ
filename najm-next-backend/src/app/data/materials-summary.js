export const materials = [
  {
    id: 1,
    name: 'مغاسل بورسلان',
    image: '/images/p/por.png',
    description: 'جميع انواع المغاسل الفاخرة',
  },
  {
    id: 2,
    name: 'بديل الخشب',
    image: '/images/k/kh.png',
    description: 'جميع انواع بديل الخشب',
  },
  {
    id: 3,
    name: 'مطابخ فاخرة ',
    image: '/images/m/mt.png',
    description: 'جميع انواع المطابخ',
  },
  {
    id: 4,
    name: 'الأسقف',
    image: '/images/A/a1.jpg',
    description: 'جميع انواع الأسقف الفاخرة',
  },
  {
    id: 5,
    name: 'الأبواب',
    image: '/images/D/d1.jpg',
    description: 'جميع انواع الأبواب الفاخرة',
  },
  {
    id: 6,
    name: 'ارم سترونج اسقف',
    image: '/images/ARM/r1.jpg',
    description: 'جميع انواع اسقف ارم سترونج الفاخرة',
  },
  {
    id: 7,
    name: 'بديل الرخام',
    image: '/images/Y/y1.JPG',
    description: 'جميع انواع بديل الرخام الفاخرة',
  },
  {
    id: 8,
    name: 'ديكورات حجر',
    image: '/images/E/e11.jpg',
    description: 'جميع انواع ديكورات الحجر الفاخرة',
  },
  {
    id: 9,
    name: 'السيراميك والبلاط',
    image: '/images/S/s1.jpg',
    description: 'جميع انواع السيراميك والبلاط الفاخرة',
  },
  {
    id: 10,
    name: 'بديل العشب',
    image: '/images/B/p9.JPG',
    description: 'جميع انواع بديل العشب الفاخرة',
  },
  {
    id: 11,
    name: 'عفش مكاتب',
    image: '/images/T/t1.JPG',
    description: 'جميع انواع عفش المكاتب الفاخرة',
  },
];

import { getMaterials } from './materials';

export async function getMaterialsSummary() {
  try {
    const full = await getMaterials();
    return full.map((m) => ({
      id: m.id,
      name: m.name,
      image: m.image,
      description: m.description,
    }));
  } catch (e) {
    return materials;
  }
}
