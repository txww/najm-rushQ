# إعداد EmailJS لإرسال البريد الإلكتروني

## خطوات الإعداد السريع

### 1. إنشاء حساب EmailJS
1. اذهب إلى [https://www.emailjs.com/](https://www.emailjs.com/)
2. اضغط على "Sign Up" وأنشئ حساباً مجانياً
3. فعل حسابك عبر البريد الإلكتروني

### 2. إعداد خدمة البريد
1. في لوحة التحكم، اضغط على "Email Services"
2. اضغط على "Add New Service"
3. اختر مزود البريد الإلكتروني (Gmail, Outlook, Yahoo, إلخ)
4. أدخل بيانات البريد الإلكتروني وكلمة المرور
5. احفظ الـ Service ID

### 3. إنشاء قالب البريد
1. اضغط على "Email Templates"
2. اضغط على "Create New Template"
3. أدخل المعلومات التالية:

**To Email:** `info@najmrush.com` (أو بريدك الإلكتروني)

**Subject:**
```
استفسار جديد من {{from_name}} - موقع نجم راش
```

**HTML Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>استفسار جديد</title>
</head>
<body style="font-family: Arial, sans-serif; direction: rtl;">
    <h2>استفسار جديد من نموذج الاتصال</h2>

    <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3>معلومات العميل:</h3>
        <p><strong>الاسم:</strong> {{from_name}}</p>
        <p><strong>البريد الإلكتروني:</strong> {{from_email}}</p>
        <p><strong>الهاتف:</strong> {{phone}}</p>
        <p><strong>نوع المشروع:</strong> {{project_type}}</p>
        <p><strong>درجة الاستعجال:</strong> {{urgency}}</p>
    </div>

    <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h3>محتوى الرسالة:</h3>
        <p>{{message}}</p>
    </div>

    <div style="margin-top: 30px; text-align: center;">
        <a href="mailto:{{from_email}}" style="background: #C28A17; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            الرد على العميل
        </a>
    </div>
</body>
</html>
```

4. احفظ الـ Template ID

### 4. الحصول على المفاتيح
1. اضغط على "Account" في لوحة التحكم
2. انسخ الـ Public Key

### 5. تحديث الكود
في ملف `src/app/contact/page.js`، حدث المتغيرات:

```javascript
// إعدادات EmailJS
const EMAILJS_SERVICE_ID = 'service_xxxxxxxxxx'; // Service ID من الخطوة 2
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxxx'; // Template ID من الخطوة 3
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx'; // Public Key من الخطوة 4
```

## الاختبار

1. شغل الموقع: `npm run dev`
2. اذهب إلى صفحة الاتصال
3. املأ النموذج وأرسل رسالة اختبار
4. تحقق من وصول البريد الإلكتروني

## ملاحظات مهمة

- **الحساب المجاني**: يسمح بإرسال 200 بريد إلكتروني شهرياً
- **الأمان**: لا تشارك المفاتيح مع أي شخص
- **البديل**: إذا لم يعمل EmailJS، سيستخدم النظام API كبديل

## استكشاف الأخطاء

### إذا لم يصل البريد:
1. تحقق من وجود أخطاء في Developer Console
2. تأكد من صحة المفاتيح
3. تحقق من spam/junk folder
4. جرب إرسال بريد اختبار من EmailJS dashboard

### أخطاء شائعة:
- **"Invalid service ID"**: تحقق من Service ID
- **"Template not found"**: تحقق من Template ID
- **"Invalid public key"**: تحقق من Public Key