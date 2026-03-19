// اختبار إرسال البريد الإلكتروني
// يمكن تشغيل هذا الملف بـ: node test-email.js

const fetch = require('node-fetch');

async function testEmailAPI() {
  console.log('🧪 بدء اختبار إرسال البريد الإلكتروني...\n');

  const testData = {
    name: 'اختبار الموقع',
    email: 'test@example.com',
    phone: '+963123456789',
    subject: 'اختبار إرسال البريد',
    message: 'هذه رسالة اختبار للتأكد من عمل نظام إرسال البريد الإلكتروني.',
    projectType: 'التعهدات الكاملة',
    urgency: 'normal'
  };

  try {
    console.log('📤 إرسال البيانات التالية:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n⏳ جاري الإرسال...');

    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log(`📊 حالة الاستجابة: ${response.status}`);
    console.log('📨 نتيجة الإرسال:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('✅ تم إرسال البريد الإلكتروني بنجاح!');
      if (result.id) {
        console.log(`🆔 معرف الرسالة: ${result.id}`);
      }
    } else {
      console.log('❌ فشل في إرسال البريد الإلكتروني');
      console.log('🔍 سبب الفشل:', result.error);
    }

  } catch (error) {
    console.error('❌ خطأ في الاتصال:', error.message);
    console.log('💡 تأكد من تشغيل الخادم: npm run dev');
    console.log('💡 تأكد من صحة إعدادات SMTP في ملف .env');
  }
}

// تشغيل الاختبار
testEmailAPI();