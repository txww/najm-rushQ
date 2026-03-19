import { PrismaClient } from '@prisma/client';
// @ts-ignore
import { materials } from '../src/app/data/materials.js';
// @ts-ignore
import { projects } from '../src/app/data/projects.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@najm.com' },
    update: {},
    create: {
      email: 'admin@najm.com',
      password: hashedPassword,
    },
  });

  // Seed materials and products
  for (const mat of materials) {
    let material = await prisma.material.findFirst({
      where: { name: mat.name }
    });
    
    if (!material) {
      material = await prisma.material.create({
        data: {
          name: mat.name,
          image: mat.image,
          description: mat.description,
        },
      });
    }

    for (const prod of mat.products) {
      const existingProduct = await prisma.product.findUnique({
        where: { id: prod.id }
      });
      
      if (!existingProduct) {
        await prisma.product.create({
          data: {
            id: prod.id,
            name: prod.name,
            image: prod.image,
            description: prod.description,
            type: prod.type,
            properties: prod.properties,
            usage: prod.usage,
            specifications: prod.specifications,
            additionalInfo: prod.additionalInfo,
            materialId: material.id,
          },
        });
      }
    }
  }

  // Seed projects
  for (const proj of projects) {
    const project = await prisma.project.upsert({
      where: { id: proj.id },
      update: {
        title: proj.title,
        location: proj.location,
        year: proj.year,
        image: proj.image,
        summary: proj.summary,
        area: proj.details.area,
        floors: proj.details.floors,
        status: proj.details.status,
        client: proj.details.client,
        mapLocation: proj.mapLocation,
        features: proj.details.features.join(', '),
      },
      create: {
        id: proj.id,
        title: proj.title,
        location: proj.location,
        year: proj.year,
        image: proj.image,
        summary: proj.summary,
        area: proj.details.area,
        floors: proj.details.floors,
        status: proj.details.status,
        client: proj.details.client,
        mapLocation: proj.mapLocation,
        features: proj.details.features.join(', '),
      },
    });

    for (const test of proj.testimonials) {
      const existingTestimonial = await prisma.testimonial.findFirst({
        where: { 
          name: test.name,
          feedback: test.feedback,
          projectId: project.id
        }
      });
      
      if (!existingTestimonial) {
        await prisma.testimonial.create({
          data: {
            name: test.name,
            feedback: test.feedback,
            projectId: project.id,
          },
        });
      }
    }
  }

  // Seed site settings
  const siteSettings = [
    // Contact Information
    {
      key: 'whatsapp_number',
      value: '0980438576',
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
      value: '0980438576',
      description: 'رقم الهاتف الأول',
      category: 'contact',
    },
    {
      key: 'phone_2',
      value: '0984986818',
      description: 'رقم الهاتف الثاني',
      category: 'contact',
    },
    {
      key: 'phone_3',
      value: '0999119202',
      description: 'رقم الهاتف الثالث',
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

    // Business Information
    {
      key: 'company_address',
      value: 'الرياض، المملكة العربية السعودية',
      description: 'عنوان الشركة',
      category: 'business',
    },
    {
      key: 'company_years',
      value: '25',
      description: 'سنوات الخبرة',
      category: 'business',
    },
    {
      key: 'completed_projects',
      value: '500',
      description: 'عدد المشاريع المكتملة',
      category: 'business',
    },
    {
      key: 'team_members',
      value: '50',
      description: 'عدد أعضاء الفريق',
      category: 'business',
    },

    // Additional Social Media
    {
      key: 'twitter_url',
      value: '#',
      description: 'رابط تويتر',
      category: 'social',
    },
    {
      key: 'linkedin_url',
      value: '#',
      description: 'رابط لينكد إن',
      category: 'social',
    },
    {
      key: 'youtube_url',
      value: '#',
      description: 'رابط يوتيوب',
      category: 'social',
    },

    // About Section
    {
      key: 'about_title',
      value: 'عن شركتنا',
      description: 'عنوان صفحة عن الشركة',
      category: 'content',
    },
    {
      key: 'about_vision',
      value: 'رؤيتنا هي أن نكون الشركة الرائدة في قطاع المقاولات والإنشاءات',
      description: 'رؤية الشركة',
      category: 'content',
    },
    {
      key: 'about_mission',
      value: 'تقديم خدمات بناء متكاملة بأعلى معايير الجودة والاحترافية',
      description: 'مهمة الشركة',
      category: 'content',
    },

    // SEO Settings
    {
      key: 'meta_description',
      value: 'شركة نجم راش للمقاولات - خدمات بناء واستشارات هندسية متخصصة',
      description: 'وصف الموقع للمحركات',
      category: 'seo',
    },
    {
      key: 'meta_keywords',
      value: 'مقاولات، بناء، تشييد، نجم راش، السعودية، تصميم داخلي',
      description: 'كلمات مفتاحية للموقع',
      category: 'seo',
    },
    {
      key: 'google_analytics_id',
      value: '',
      description: 'معرف Google Analytics',
      category: 'analytics',
    },

    // Company Objectives - أهداف الشركة
    {
      key: 'objective_1',
      value: 'رفع جودة التنفيذ والالتزام بمعايير الجودة العالمية',
      description: 'الهدف الأول للشركة',
      category: 'business',
    },
    {
      key: 'objective_2',
      value: 'تحسين جودة الأعمال الإنشائية والتشطيبات عبر استخدام مواد معتمدة وتعزيز الرقابة الهندسية',
      description: 'الهدف الثاني للشركة',
      category: 'business',
    },
    {
      key: 'objective_3',
      value: 'تحسين سرعة الإنجاز والالتزام بالمواعيد المتفق عليها',
      description: 'الهدف الثالث للشركة',
      category: 'business',
    },
    {
      key: 'objective_4',
      value: 'تعزيز التواصل والشفافية مع العملاء حول تقدم المشاريع',
      description: 'الهدف الرابع للشركة',
      category: 'business',
    },
    {
      key: 'objective_5',
      value: 'توسيع فريق الخبراء والمتخصصين في المجالات الهندسية المختلفة',
      description: 'الهدف الخامس للشركة',
      category: 'business',
    },
    {
      key: 'objective_6',
      value: 'تطوير طرق العرض والتسعير مع خيارات متعددة تناسب احتياجات العملاء',
      description: 'الهدف السادس للشركة',
      category: 'business',
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

  // Seed Partners
  const existingPartners = await prisma.partner.count();
  if (existingPartners === 0) {
    await prisma.partner.createMany({
      data: [
        {
          name: 'الشركة العامة للمقاولات',
          website: 'https://example.com',
        },
        {
          name: 'شركة النقل والحفريات',
          website: 'https://example.com',
        },
        {
          name: 'مؤسسة التوريدات المتقدمة',
          website: 'https://example.com',
        },
        {
          name: 'شركة الديكور والتصميم',
          website: 'https://example.com',
        },
        {
          name: 'المؤسسة الكهربائية المتخصصة',
          website: 'https://example.com',
        },
        {
          name: 'شركة الصيانة والإصلاح',
          website: 'https://example.com',
        },
      ],
    });
  }

  // Seed Services
  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: 'التعهدات الكاملة',
          description: 'تنفيذ المشاريع من الألف إلى الياء، من التأسيس وحتى التسليم الكامل بضمان الجودة العالية.',
          icon: '🏗️',
        },
        {
          title: 'التأسيس والتخطيط',
          description: 'إعداد المخططات الاحترافية والأعمال الصحية والكهربائية مع تخطيط متكامل للبنية التحتية.',
          icon: '📐',
        },
        {
          title: 'الإكساء والتشطيب',
          description: 'تنفيذ جميع أعمال التشطيب: بلاط، دهانات، رخام، أسقف، وديكور باحترافية عالية.',
          icon: '🎨',
        },
        {
          title: 'أنظمة الكاميرات',
          description: 'تركيب كاميرات مراقبة بأنواع متعددة مع دعم فني مستمر وضمان كامل على التركيب.',
          icon: '📹',
        },
        {
          title: 'الأعمال الكهربائية',
          description: 'تصميم وتركيب الأنظمة الكهربائية الحديثة بمواد عالية الجودة وضمان الأمان.',
          icon: '⚡',
        },
        {
          title: 'الأعمال الصحية',
          description: 'تركيب وصيانة أنظمة السباكة والصرف الصحي بأعلى معايير الجودة والكفاءة.',
          icon: '🔧',
        },
      ],
    });
  }

  // Seed Team Members
  const existingTeam = await prisma.teamMember.count();
  if (existingTeam === 0) {
    await prisma.teamMember.createMany({
      data: [
        {
          name: 'أحمد محمد',
          position: 'مدير المشاريع',
          bio: 'مهندس مدني مع أكثر من 15 عاماً من الخبرة في إدارة المشاريع الكبرى والتأكد من تنفيذها بأعلى معايير الجودة.',
          phone: '0980438576',
          email: 'ahmed@najmrush.com',
        },
        {
          name: 'سارة أحمد',
          position: 'مديرة التصميم',
          bio: 'مصممة داخلية متخصصة في التصاميم العصرية والكلاسيكية مع خبرة واسعة في مجال الديكور والتصميم الداخلي.',
          phone: '0984986818',
          email: 'sara@najmrush.com',
        },
        {
          name: 'محمد علي',
          position: 'مهندس تشطيب',
          bio: 'خبير في أعمال التشطيب والديكور بأحدث التقنيات والمواد، متخصص في تنفيذ المشاريع بأعلى مستويات الدقة.',
          phone: '0999119202',
          email: 'mohamed@najmrush.com',
        },
        {
          name: 'فاطمة حسن',
          position: 'مديرة الموارد البشرية',
          bio: 'متخصصة في إدارة الموارد البشرية وتطوير الفرق مع التركيز على بناء بيئة عمل إيجابية ومبتكرة.',
          phone: '0987654321',
          email: 'fatima@najmrush.com',
        },
        {
          name: 'علي محمود',
          position: 'مهندس كهربائي',
          bio: 'مهندس كهربائي معتمد متخصص في تصميم وتركيب الأنظمة الكهربائية الحديثة بأعلى معايير الأمان.',
          phone: '0976543210',
          email: 'ali@najmrush.com',
        },
        {
          name: 'نور عبدالله',
          position: 'مصممة جرافيك',
          bio: 'مصممة جرافيك مبدعة متخصصة في تصميم الهوية البصرية والمواد التسويقية للمشاريع المعمارية.',
          phone: '0965432109',
          email: 'nour@najmrush.com',
        },
      ],
    });
  }

  console.log('Seeding completed');
}

  // Seed customers
  const existingCustomers = await prisma.customer.count();
  if (existingCustomers === 0) {
    await prisma.customer.createMany({
      data: [
        {
          name: 'أحمد محمد',
          position: 'مدير مشاريع',
          company: 'شركة البناء الحديث',
          rating: 5,
          text: 'تعاملت مع شركة نجم راش في تشطيب فيلا كاملة، وكان العمل احترافياً من البداية للنهاية. الجودة عالية والالتزام بالمواعيد ممتاز. أنصح بالتعامل معهم بشدة.',
          project: 'تشطيب فيلا 500م²',
        },
        {
          name: 'فاطمة علي',
          position: 'ربة منزل',
          rating: 5,
          text: 'رائع جداً! قاموا بتركيب الحجر الصناعي في منزلي بمهنية فائقة. النتيجة كانت مذهلة والسعر مناسب. شكراً لفريق العمل على الجهد المبذول.',
          project: 'تركيب حجر صناعي',
        },
        {
          name: 'محمد عبدالله',
          position: 'مالك شركة',
          company: 'مجموعة الأعمال التجارية',
          rating: 5,
          text: 'نحن نعتمد على شركة نجم راش في جميع مشاريعنا الإنشائية. دائماً ما يقدمون أعمالاً عالية الجودة ويحترمون المواعيد والميزانيات. شراكة ناجحة ومستمرة.',
          project: 'مجمع سكني 20 وحدة',
        },
        {
          name: 'سارة أحمد',
          position: 'مهندسة معمارية',
          company: 'مكتب التصميم المعماري',
          rating: 5,
          text: 'فريق محترف وماهر. قاموا بتنفيذ أعمال التشطيب في مشروعنا بأدق التفاصيل. التواصل ممتاز والمتابعة مستمرة حتى التسليم النهائي.',
          project: 'عمارة سكنية 15 طابق',
        },
      ],
    });
  }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
