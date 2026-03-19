# دليل رفع المشروع على VPS — najmrush.com

## المتطلبات
- VPS بنظام Ubuntu 22.04
- دومين najmrush.com مضاف DNS A record يشير لـ IP الـ VPS
- سجل DNS لـ cms.najmrush.com يشير لنفس الـ IP

---

## الخطوة 1: تجهيز الـ VPS

```bash
# تحديث النظام
apt update && apt upgrade -y

# تثبيت Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# تثبيت PM2 و Nginx و Certbot
npm install -g pm2
apt install -y nginx certbot python3-certbot-nginx git

# إنشاء مجلد المشروع
mkdir -p /var/www/najmrush
mkdir -p /var/log/pm2

# إنشاء مجلد الصور المرفوعة
mkdir -p /var/www/najmrush/najm-next-backend/public/uploads
```

---

## الخطوة 2: رفع الكود

```bash
cd /var/www/najmrush

# إما clone من git:
git clone YOUR_REPO_URL najm-next-backend
git clone YOUR_REPO_URL_STRAPI najm-strapi

# أو رفع الملفات عبر scp/rsync من جهازك:
# scp -r "C:/Projectss/Najm Rush/najm-next-backend" root@VPS_IP:/var/www/najmrush/
# scp -r "C:/Projectss/Najm Rush/najm-strapi" root@VPS_IP:/var/www/najmrush/
# scp "C:/Projectss/Najm Rush/ecosystem.config.js" root@VPS_IP:/var/www/najmrush/
```

---

## الخطوة 3: إعداد متغيرات البيئة

### لـ Next.js:
```bash
cp /var/www/najmrush/najm-next-backend/.env.production /var/www/najmrush/najm-next-backend/.env.local
nano /var/www/najmrush/najm-next-backend/.env.local
```
عدّل هذين السطرين بالقيم الحقيقية:
```
STRAPI_API_TOKEN=ضع_التوكن_الحقيقي_من_Strapi
SMTP_PASS=ضع_كلمة_مرور_الايميل
```

### لـ Strapi:
```bash
# توليد مفاتيح جديدة
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# شغّل الأمر أعلاه 6 مرات، احفظ كل قيمة

cp /var/www/najmrush/najm-strapi/.env.production /var/www/najmrush/najm-strapi/.env
nano /var/www/najmrush/najm-strapi/.env
```
ضع القيم المولّدة في الأماكن الصحيحة.

---

## الخطوة 4: بناء المشروعين

```bash
# Next.js
cd /var/www/najmrush/najm-next-backend
npm ci
npm run build

# Strapi
cd /var/www/najmrush/najm-strapi
npm ci
NODE_ENV=production npm run build
```

---

## الخطوة 5: تشغيل PM2

```bash
cd /var/www/najmrush
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # اتبع الأمر الذي يظهر لتشغيل PM2 تلقائياً عند الإقلاع
```

تحقق من أن الخدمتين تعملان:
```bash
pm2 status
pm2 logs nextjs --lines 50
pm2 logs strapi --lines 50
```

---

## الخطوة 6: إعداد Nginx

```bash
# انسخ الكونفيج
cp /var/www/najmrush/nginx.conf /etc/nginx/sites-available/najmrush
ln -s /etc/nginx/sites-available/najmrush /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# اختبر الكونفيج
nginx -t

# شغّل Nginx
systemctl restart nginx
```

---

## الخطوة 7: شهادة SSL

```bash
# احصل على شهادة SSL لكلا الدومينين
certbot --nginx -d najmrush.com -d www.najmrush.com
certbot --nginx -d cms.najmrush.com

# تجديد تلقائي (يعمل مسبقاً مع certbot)
systemctl status certbot.timer
```

---

## الخطوة 8: إعداد Strapi Admin

افتح `https://cms.najmrush.com/admin` في المتصفح وأنشئ حساب Admin.

### إنشاء API Token للـ Next.js:
1. Settings → API Tokens → Create new token
2. Name: `nextjs-token`
3. Token type: **Full Access**
4. انسخ التوكن وضعه في `.env.local` للـ Next.js:
   ```
   STRAPI_API_TOKEN=التوكن_الجديد
   ```
5. أعد تشغيل Next.js:
   ```bash
   pm2 restart nextjs
   ```

### إعداد صلاحيات Public Role:
1. Settings → Users & Permissions → Roles → Public
2. فعّل **find** و **findOne** لجميع المجموعات
3. Save

---

## الخطوة 9: التحقق النهائي

```bash
# اختبر الموقع
curl -I https://najmrush.com
curl -I https://cms.najmrush.com

# اختبر API
curl https://najmrush.com/api/strapi-test
```

---

## عمليات الصيانة

### تحديث الكود (بعد تعديلات):
```bash
cd /var/www/najmrush
bash deploy.sh
```

### مراقبة الخدمات:
```bash
pm2 status
pm2 monit
```

### عرض السجلات:
```bash
pm2 logs nextjs
pm2 logs strapi
```

### نسخ احتياطي لقاعدة البيانات:
```bash
# نسخ احتياطي يدوي
cp /var/www/najmrush/najm-strapi/.tmp/data.db /var/backups/strapi-$(date +%Y%m%d).db

# جدول تلقائي (كل يوم الساعة 3 صباحاً)
echo "0 3 * * * root cp /var/www/najmrush/najm-strapi/.tmp/data.db /var/backups/strapi-\$(date +\%Y\%m\%d).db" >> /etc/cron.d/strapi-backup
```

---

## إعدادات DNS المطلوبة

في لوحة تحكم الدومين، أضف:

| Type | Name | Value |
|------|------|-------|
| A    | @    | IP_VPS |
| A    | www  | IP_VPS |
| A    | cms  | IP_VPS |

---

## الهيكل النهائي على الـ VPS

```
/var/www/najmrush/
├── ecosystem.config.js       ← PM2
├── najm-next-backend/        ← Next.js (port 3000)
│   ├── .env.local            ← متغيرات الإنتاج
│   ├── public/uploads/       ← الصور المرفوعة
│   └── .next/                ← Build output
└── najm-strapi/              ← Strapi (port 1337)
    ├── .env                  ← متغيرات الإنتاج
    └── .tmp/data.db          ← قاعدة البيانات
```
