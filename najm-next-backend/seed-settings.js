import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSettings() {
  // Seed site settings
  const siteSettings = [
    // Contact Information
    {
      key: 'whatsapp_number',
      value: '123456789',
      description: 'رقم الواتساب',
      category: 'contact',
    },
    {
      key: 'email',
      value: 'info@najmrush.com',
      description: 'البريد الإلكتروني',
      category: 'contact',
    },
    {
      key: 'phone',
      value: '+966123456789',
      description: 'رقم الهاتف',
      category: 'contact',
    },

    // Social Media Links
    {
      key: 'facebook_url',
      value: 'https://www.facebook.com/profile.php?id=61583453174892',
      description: 'رابط الفيسبوك',
      category: 'social',
    },
    {
      key: 'instagram_url',
      value: 'https://www.instagram.com/najm.rush/',
      description: 'رابط الإنستغرام',
      category: 'social',
    },

    // Company Information
    {
      key: 'company_name',
      value: 'نجم راش للمقاولات',
      description: 'اسم الشركة',
      category: 'branding',
    },
    {
      key: 'company_description',
      value:
        'شركة متخصصة في تنفيذ أعمال المقاولات والتعهدات الكاملة من مرحلة التأسيس وحتى التسليم بالمفتاح. نتميز بالدقة والجودة في جميع أعمال البلاط، الغرانيت، التشطيبات، والأنظمة التقنية.',
      description: 'وصف الشركة',
      category: 'content',
    },

    // Hero Section Content
    {
      key: 'hero_title',
      value: 'نجــم راش للمقاولات',
      description: 'عنوان القسم الرئيسي',
      category: 'content',
    },
    {
      key: 'hero_description',
      value:
        'نقدم خدمات متخصصة في تنفيذ أعمال التشطيب، الحجر الصناعي، بدائل الخشب، الرخام، الباركيه، أنظمة الكاميرات والشبكات، إضافة إلى التعهدات الكاملة من التأسيس حتى التسليم بالمفتاح — بجودة عالية ومهنية تليق بعملائنا.',
      description: 'وصف القسم الرئيسي',
      category: 'content',
    },

    // Footer Content
    {
      key: 'footer_description',
      value:
        'شركة متخصصة في تنفيذ أعمال المقاولات والتعهدات الكاملة من مرحلة التأسيس وحتى التسليم بالمفتاح. نتميز بالدقة والجودة في جميع أعمال البلاط، الغرانيت، التشطيبات، والأنظمة التقنية.',
      description: 'وصف الشركة في الفوتر',
      category: 'content',
    },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value,
        description: setting.description,
        category: setting.category,
      },
      create: setting,
    });
  }

  console.log('Settings seeded successfully');
}

seedSettings()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
