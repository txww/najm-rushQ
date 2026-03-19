# دليل إعداد Cloudflare Tunnel لموقع نجم راش

## المتطلبات الأساسية

### 1. حساب Cloudflare
- إنشاء حساب على [Cloudflare](https://cloudflare.com)
- إضافة نطاق `najmrush.com` إلى Cloudflare

### 2. تثبيت Cloudflare Tunnel
```bash
# على Windows
winget install --id Cloudflare.cloudflared

# أو تحميل من الموقع الرسمي
# https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/
```

### 3. تسجيل الدخول
```bash
cloudflared tunnel login
```
سيفتح المتصفح لتسجيل الدخول إلى Cloudflare.

## خطوات الإعداد

### الخطوة 1: إنشاء Tunnel
```bash
cloudflared tunnel create najm-tunnel
```

### الخطوة 2: إعداد DNS Record
```bash
cloudflared tunnel route dns najm-tunnel najm-rush.com
```

### الخطوة 3: إنشاء ملف التكوين
أنشئ ملف `cloudflared.yml` في مجلد المشروع:

```yaml
tunnel: najm-tunnel
credentials-file: ~/.cloudflared/credentials.json

ingress:
  - hostname: najm-rush.com
    service: http://localhost:3000
  - hostname: www.najm-rush.com
    service: http://localhost:3000
  - service: http_status:404
```

### الخطوة 4: تشغيل Tunnel
```bash
cloudflared tunnel run najm-tunnel
```

أو للتشغيل في الخلفية:
```bash
cloudflared tunnel run --config cloudflared.yml najm-tunnel
```

## إعداد الموقع للإنتاج

### 1. بناء الموقع
```bash
npm run build
```

### 2. تشغيل الموقع في وضع الإنتاج
```bash
npm run start:prod
```

### 3. إعداد متغيرات البيئة
تأكد من وجود ملف `.env.production` مع الإعدادات الصحيحة:

```env
NODE_ENV=production
SITE_URL=https://najm-rush.com
NEXT_PUBLIC_API_BASE_URL=https://najm-rush.com
```

## تشغيل الخدمات

### الطريقة الأولى: تشغيل يدوي
```bash
# Terminal 1: تشغيل الموقع
npm run start:prod

# Terminal 2: تشغيل Cloudflare Tunnel
cloudflared tunnel run najm-tunnel
```

### الطريقة الثانية: استخدام Docker
```bash
# بناء وتشغيل بـ Docker
docker-compose up -d

# تشغيل Cloudflare Tunnel
cloudflared tunnel run najm-tunnel
```

### الطريقة الثالثة: إعداد كخدمة Windows
```powershell
# إنشاء خدمة Windows لـ Cloudflare Tunnel
cloudflared service install
```

## التحقق من العمل

### 1. فحص حالة Tunnel
```bash
cloudflared tunnel list
```

### 2. فحص DNS
```bash
nslookup najm-rush.com
```

### 3. اختبار الموقع
```bash
curl -I https://najm-rush.com
```

## استكشاف الأخطاء

### مشكلة: Tunnel لا يعمل
```bash
# فحص السجلات
cloudflared tunnel list

# إعادة تشغيل
cloudflared tunnel delete najm-tunnel
cloudflared tunnel create najm-tunnel
```

### مشكلة: الموقع لا يحمل
```bash
# فحص إذا كان الموقع يعمل محلياً
curl http://localhost:3000

# فحص logs
cloudflared tunnel logs najm-tunnel
```

### مشكلة: شهادة SSL
تأكد من أن DNS records موجهة إلى Cloudflare:
- Type: CNAME
- Name: najm-rush.com
- Target: najm-tunnel.abcdef1234567890.cloudflare.com

## الأمان

### 1. قيود الوصول (اختياري)
يمكن إضافة قيود الوصول في لوحة تحكم Cloudflare:
- Access Policies
- Firewall Rules
- Rate Limiting

### 2. مراقبة الاستخدام
```bash
# عرض إحصائيات
cloudflared tunnel info najm-tunnel
```

## الصيانة

### تحديث Cloudflare Tunnel
```bash
cloudflared update
```

### نسخ احتياطي للإعدادات
```bash
# حفظ ملف التكوين
cp ~/.cloudflared/config.yml backup-config.yml
```

## الدعم الفني

- [Cloudflare Tunnel Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

## ملاحظات مهمة

1. **الأداء**: Cloudflare Tunnel يوفر أداء ممتاز مع ضغط البيانات
2. **الأمان**: جميع الاتصالات مشفرة من البداية للنهاية
3. **التكلفة**: مجاني للاستخدام الأساسي
4. **التوافر**: عالي التوافر مع إعادة الاتصال التلقائي

**تأكد من اختبار جميع الوظائف بعد النشر!**