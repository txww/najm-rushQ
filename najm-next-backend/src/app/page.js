import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import StatsSection from './components/StatsSection';
import ServicesSection from './components/ServicesSection';
import MaterialsSection from './components/MaterialsSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProjectsSection from './components/ProjectsSection';
import CTASection from './components/CTASection';
import PartnersSection from './components/PartnersSection';

export const metadata = {
  title: 'الرئيسية | نجم راش للمقاولات - الريادة في الإنشاءات والمقاولات',
  description:
    'شركة نجم راش للمقاولات - أكثر من 25 عاماً من الخبرة في المقاولات والإنشاءات. نقدم حلولاً متكاملة للمشاريع التجارية والسكنية بأعلى معايير الجودة والتميز.',
  keywords: [
    'مقاولات',
    'إنشاءات',
    'تشطيب',
    'تعهدات كاملة',
    'نجم راش',
    'مقاول سعودي',
    'شركة مقاولات',
    'بناء',
    'تطوير عقاري',
  ],
  openGraph: {
    title: 'نجم راش للمقاولات - الريادة في الإنشاءات',
    description: 'أكثر من 25 عاماً من التميز في مجال المقاولات والإنشاءات',
    images: ['/images/hero-professional.svg'],
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نجم راش للمقاولات',
    description: 'الريادة في الإنشاءات والمقاولات منذ 25 عاماً',
    images: ['/images/hero-professional.svg'],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <MaterialsSection />      <TeamSection />      <ProjectsSection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
