# 🚀 دليل النشر - موقع شركة نجم راش

## طرق النشر المتاحة

### 1. النشر المحلي مع Cloudflare Tunnel (الأسهل)

#### المتطلبات:
- Node.js 18+
- حساب Cloudflare
- نطاق مسجل (najmrush.com)

#### خطوات النشر:

1. **تحضير الجهاز:**
   ```bash
   # تشغيل script النشر
   ./deploy.bat
   ```

2. **إعداد Cloudflare Tunnel:**
   ```bash
   # تثبيت cloudflared
   winget install --id Cloudflare.cloudflared

   # تسجيل الدخول
   cloudflared tunnel login

   # إنشاء tunnel
   cloudflared tunnel create najm-tunnel

   # إعداد DNS
   cloudflared tunnel route dns najm-tunnel najm-rush.com
   ```

3. **تشغيل الموقع:**
   ```bash
   # Terminal 1: الموقع
   npm run start:prod

   # Terminal 2: Cloudflare Tunnel
   cloudflared tunnel run najm-tunnel
   ```

### 2. النشر باستخدام Docker

```bash
# بناء الصورة
docker build -t najm-next .

# تشغيل الحاوية
docker run -p 3000:3000 najm-next

# أو باستخدام docker-compose
docker-compose up -d
```

### 3. النشر على منصات السحابة

#### Vercel (الأسهل):
```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel
```

#### Netlify:
```bash
# تثبيت Netlify CLI
npm i -g netlify-cli

# النشر
netlify deploy --prod --dir .next
```

## إعدادات البيئة

### للإنتاج:
```env
NODE_ENV=production
SITE_URL=https://najm-rush.com
NEXT_PUBLIC_API_BASE_URL=https://najm-rush.com
DATABASE_URL="file:./dev.db"
```

### للتطوير:
```env
NODE_ENV=development
SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

## فحص النشر

### اختبارات أساسية:
```bash
# فحص الصفحة الرئيسية
curl -I https://najm-rush.com

# فحص APIs
curl https://najm-rush.com/api/services

# فحص لوحة الإدارة
curl -I https://najm-rush.com/admin
```

### اختبارات شاملة:
- ✅ الصفحة الرئيسية تحمل
- ✅ جميع الصفحات تعمل
- ✅ النماذج ترسل البيانات
- ✅ لوحة الإدارة تعمل
- ✅ الصور تظهر
- ✅ التصميم متجاوب

## استكشاف الأخطاء

### مشاكل شائعة:

1. **الموقع لا يحمل:**
   ```bash
   # فحص إذا كان الموقع يعمل محلياً
   curl http://localhost:3000

   # فحص logs
   npm run start:prod
   ```

2. **Cloudflare Tunnel لا يعمل:**
   ```bash
   # فحص حالة tunnel
   cloudflared tunnel list

   # إعادة تشغيل
   cloudflared tunnel delete najm-tunnel
   cloudflared tunnel create najm-tunnel
   ```

3. **قاعدة البيانات:**
   ```bash
   # إعادة إعداد قاعدة البيانات
   npx prisma db push
   npx prisma db seed
   ```

## الأمان

### إعدادات أساسية:
- ✅ HTTPS مفعل عبر Cloudflare
- ✅ Headers الأمان مضافة
- ✅ CORS مكون بشكل صحيح
- ✅ Rate limiting متاح

### إعدادات متقدمة:
- إضافة Cloudflare Access للتحكم في الوصول
- إعداد Firewall rules
- مراقبة الاستخدام

## الصيانة

### التحديثات:
```bash
# تحديث الكود
git pull

# إعادة البناء
npm run build

# إعادة التشغيل
npm run start:prod
```

### النسخ الاحتياطي:
- قاعدة البيانات: `dev.db`
- الصور: مجلد `public/images`
- الإعدادات: ملفات `.env`

## الدعم الفني

- 📧 **البريد الإلكتروني**: info@najmrush.com
- 📱 **واتساب**: +963984966818
- 📋 **دليل Cloudflare Tunnel**: CLOUDFLARE_TUNNEL_SETUP.md

---

## ✅ قائمة التحقق قبل النشر

- [ ] Node.js مثبت (الإصدار 18+)
- [ ] قاعدة البيانات مهيأة
- [ ] البيانات الافتراضية مضافة
- [ ] الموقع يبنى بدون أخطاء
- [ ] متغيرات البيئة مكونة
- [ ] Cloudflare Tunnel مهيأ
- [ ] النطاق موجه إلى Cloudflare
- [ ] SSL certificate مفعل
- [ ] جميع الصفحات مختبرة
- [ ] لوحة الإدارة تعمل

**🚀 الموقع جاهز للنشر!**