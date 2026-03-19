// اختبار صفحة التواصل
// يمكن تشغيل هذا الملف بـ: node test-contact.js

const http = require('http');

const testContactPage = () => {
  console.log('🧪 بدء اختبار صفحة التواصل...\n');

  // اختبار الوصول للصفحة
  const req = http.request({
    hostname: 'localhost',
    port: 3001,
    path: '/contact',
    method: 'GET'
  }, (res) => {
    console.log('✅ تم الوصول لصفحة التواصل');
    console.log(`📊 حالة الاستجابة: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      // فحص وجود عناصر مهمة في الصفحة
      const checks = [
        { name: 'عنوان الصفحة', check: data.includes('تواصل معنا') },
        { name: 'نموذج الاتصال', check: data.includes('نموذج الاتصال') },
        { name: 'معلومات الشركة', check: data.includes('معلومات الشركة') },
        { name: 'الأسئلة الشائعة', check: data.includes('الأسئلة الشائعة') },
        { name: 'WhatsApp', check: data.includes('WhatsApp') },
        { name: 'رابط الهاتف', check: data.includes('tel:') },
        { name: 'رابط البريد', check: data.includes('mailto:') },
        { name: 'ساعات العمل', check: data.includes('ساعات العمل') },
        { name: 'إجراءات سريعة', check: data.includes('إجراءات سريعة') }
      ];

      console.log('\n🔍 فحص عناصر الصفحة:');
      checks.forEach(({ name, check }) => {
        console.log(`${check ? '✅' : '❌'} ${name}`);
      });

      const passedChecks = checks.filter(c => c.check).length;
      const totalChecks = checks.length;

      console.log(`\n📈 النتيجة: ${passedChecks}/${totalChecks} اختبارات نجحت`);

      if (passedChecks === totalChecks) {
        console.log('🎉 جميع الاختبارات نجحت! صفحة التواصل جاهزة للاستخدام.');
      } else {
        console.log('⚠️  بعض الاختبارات فشلت. يرجى مراجعة الكود.');
      }
    });
  });

  req.on('error', (err) => {
    console.error('❌ خطأ في الاتصال:', err.message);
    console.log('💡 تأكد من تشغيل الخادم: npm run dev');
  });

  req.setTimeout(5000, () => {
    console.error('❌ انتهت مهلة الاتصال');
    req.destroy();
  });

  req.end();
};

// تشغيل الاختبار
testContactPage();