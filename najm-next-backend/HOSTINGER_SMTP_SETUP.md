# دليل إعداد البريد الإلكتروني من Hostinger

## المشكلة الحالية:

النظام يعمل في **وضع الاختبار** فقط. الرسائل تظهر في console الخادم بدلاً من الإرسال الفعلي.

## الحل:

تحتاج إلى الحصول على إعدادات SMTP الصحيحة من Hostinger.

## خطوات الحصول على الإعدادات:

### 1. تسجيل الدخول إلى Hostinger

- اذهب إلى [hostinger.com](https://hostinger.com)
- سجل الدخول إلى حسابك

### 2. الوصول إلى إعدادات البريد

- افتح **hPanel** (لوحة التحكم)
- اذهب إلى **Emails** → **Email Accounts**
- اضغط على **Manage** بجانب حساب البريد `info@najmrush.com`

### 3. الحصول على إعدادات SMTP

- ابحث عن **"Mail Client Settings"** أو **"Configure Email Client"**
- ستجد الإعدادات التالية:
  - **SMTP Server/Host**
  - **Port**
  - **Username** (بريدك الكامل)
  - **Password** (كلمة المرور الحالية أو أنشئ جديدة)

### 4. إعدادات شائعة لـ Hostinger:

```
SMTP Host: smtp.hostinger.com
Port: 587 (أو 465)
Username: info@najmrush.com
Password: [كلمة المرور من Hostinger]
```

### 5. تحديث ملف .env

بعد الحصول على الإعدادات، حدث ملف `.env`:

```env
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=587
SMTP_USER="info@najmrush.com"
SMTP_PASS="كلمة_المرور_الصحيحة"
```

### 6. تفعيل الإرسال الحقيقي

بعد تحديث الإعدادات، أزل التعليق من nodemailer في `src/app/api/send-email/route.js`

## ملاحظات مهمة:

- تأكد من أن حساب البريد مفعل وغير محظور
- جرب كلا المنفذين (587 و 465) إذا لم يعمل أحدهما
- إذا واجهت مشاكل، اتصل بدعم Hostinger

## الاختبار:

بعد الإعداد، شغل `npm run dev` واختبر النموذج من `http://localhost:3000/contact`
