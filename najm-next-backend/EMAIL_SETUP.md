# إعداد خدمة البريد الإلكتروني مع Hostinger

## خطوات إعداد البريد الإلكتروني من Hostinger

### 1. إنشاء حساب بريد إلكتروني في Hostinger

1. اذهب إلى لوحة تحكم Hostinger الخاصة بك
2. اذهب إلى قسم "Emails" أو "البريد الإلكتروني"
3. اضغط على "Create Email Account" أو "إنشاء حساب بريد إلكتروني"
4. أدخل اسم البريد المطلوب (مثل: contact@najm-rush.com)
5. حدد كلمة مرور قوية واحفظها

### 2. الحصول على إعدادات SMTP

في لوحة تحكم Hostinger، ابحث عن إعدادات SMTP أو "Email Settings":

**إعدادات SMTP الشائعة لـ Hostinger:**

- **SMTP Host**: smtp.hostinger.com
- **SMTP Port**: 587 (أو 465 للـ SSL)
- **Encryption**: STARTTLS (للمنفذ 587) أو SSL (للمنفذ 465)
- **Username**: بريدك الكامل (مثل: contact@najm-rush.com)
- **Password**: كلمة المرور التي أنشأتها

### 3. تحديث متغيرات البيئة

1. افتح ملف `.env` في مجلد المشروع
2. أضف المتغيرات التالية:

```env
# SMTP Settings for Hostinger Email
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=587
SMTP_USER="contact@najm-rush.com"
SMTP_PASS="your_email_password_here"
```

استبدل القيم بالمعلومات الصحيحة من حسابك.

### 4. اختبار النموذج

1. شغل المشروع: `npm run dev`
2. اذهب إلى صفحة التواصل: `http://localhost:3000/contact`
3. املأ النموذج وأرسله
4. تحقق من بريدك الإلكتروني

## ملاحظات مهمة

- **الأمان**: لا تشارك كلمة مرور البريد مع أي شخص
- **التحقق**: تأكد من أن البريد المرسل إليه موجود في إعدادات الموقع (`/admin/settings`)
- **المنافذ**: جرب المنفذ 587 أولاً، وإذا لم يعمل جرب 465 مع `secure: true`

## استكشاف الأخطاء

### إذا لم يصل البريد:

1. تحقق من صحة إعدادات SMTP من لوحة تحكم Hostinger
2. جرب الإعدادات التالية:
   - **SMTP Host**: `smtp.hostinger.com` أو `mail.yourdomain.com`
   - **Port**: `587` (STARTTLS) أو `465` (SSL/TLS)
   - **Username**: بريدك الكامل
   - **Password**: كلمة المرور من Hostinger
3. تأكد من أن حساب البريد مفعل في Hostinger
4. تحقق من أن الدومين مفعل ومؤكد

### خطوات الحصول على الإعدادات من Hostinger:

1. اذهب إلى **hPanel** → **Emails** → **Email Accounts**
2. اضغط على **Manage** بجانب حساب البريد
3. ابحث عن **"Mail Client Settings"** أو **"Configure Email Client"**
4. ستجد الإعدادات المطلوبة هناك

### إذا استمرت المشكلة:

- استخدم وضع الاختبار (الذي يعمل الآن) للتطوير
- اتصل بدعم Hostinger للحصول على المساعدة
- جرب استخدام خدمة بريد إلكتروني أخرى مثل Gmail SMTP

2. تأكد من أن البريد المرسل إليه صحيح
3. تحقق من console في المتصفح للأخطاء

### إذا ظهر خطأ في الإرسال:

1. تأكد من أن جميع الحقول مملوءة
2. تحقق من صحة البريد الإلكتروني
3. راجع logs الخادم

## الدعم

إذا واجهت أي مشاكل، راجع:

- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
