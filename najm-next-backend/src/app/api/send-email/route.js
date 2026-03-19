import nodemailer from 'nodemailer';
import { getSiteSettings } from '@/lib/strapi';
import { NextResponse } from 'next/server';

// إعداد SMTP transporter لـ Hostinger
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT == '465', // true للمنفذ 465، false للمنافذ الأخرى
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // إعدادات إضافية لتجنب المشاكل
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      // timeout لتجنب انتظار طويل
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
      // إعدادات إضافية لـ Hostinger
      debug: true,
      logger: true
    });
  }
  return null;
};

// إرسال بريد إلكتروني باستخدام Resend (حل احتياطي)
const sendWithResend = async (mailOptions) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Resend API key not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Najm Rush <onboarding@resend.dev>',
      to: [mailOptions.to],
      subject: mailOptions.subject,
      html: mailOptions.html,
      reply_to: mailOptions.from,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
};

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // التحقق من صحة البيانات
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني غير صحيح' },
        { status: 400 }
      );
    }

    // الحصول على البريد الإلكتروني من إعدادات الموقع في Strapi
    let recipientEmail = process.env.SMTP_USER || 'info@najmrush.com';
    try {
      const settings = await getSiteSettings();
      if (settings?.email) recipientEmail = settings.email;
    } catch {
      // استخدام البريد الافتراضي في حال فشل
    }

    // إرسال البريد الإلكتروني
    let result;
    let transporter;
    try {
      transporter = createTransporter();
    } catch (error) {
      console.error('Error creating email transporter:', error);
      transporter = null;
    }

    if (transporter) {
      // استخدام SMTP إذا كانت الإعدادات متوفرة
      try {
        const mailOptions = {
          from: `"${name}" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          subject: `استفسار جديد من ${name} - موقع نجم راش`,
          html: `
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>رسالة جديدة من نموذج الاتصال</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">

                      <!-- Header -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #C28A17 0%, #D4AF37 100%); padding: 30px 40px; text-align: center;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                            نجم راش للمقاولات
                          </h1>
                          <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                            استفسار جديد من نموذج الاتصال
                          </p>
                        </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">

                            <!-- Greeting -->
                            <tr>
                              <td style="padding-bottom: 30px;">
                                <h2 style="margin: 0 0 10px 0; color: #333333; font-size: 22px; font-weight: 600;">
                                  مرحباً بك في فريق نجم راش
                                </h2>
                                <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                  لقد تلقينا استفساراً جديداً من خلال موقعنا الإلكتروني. إليك تفاصيل الرسالة:
                                </p>
                              </td>
                            </tr>

                            <!-- Customer Info -->
                            <tr>
                              <td style="padding-bottom: 30px;">
                                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 10px; padding: 25px; border: 1px solid #dee2e6;">
                                  <h3 style="margin: 0 0 20px 0; color: #C28A17; font-size: 18px; font-weight: 600;">
                                    📋 معلومات العميل
                                  </h3>
                                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                    <tr>
                                      <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                        <strong style="color: #495057; font-weight: 600;">الاسم:</strong>
                                        <span style="color: #212529; margin-right: 10px;">${name}</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                        <strong style="color: #495057; font-weight: 600;">البريد الإلكتروني:</strong>
                                        <span style="color: #212529; margin-right: 10px;">${email}</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding: 8px 0;">
                                        <strong style="color: #495057; font-weight: 600;">تاريخ الإرسال:</strong>
                                        <span style="color: #212529; margin-right: 10px;">${new Date().toLocaleString('ar-SA')}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>

                            <!-- Message -->
                            <tr>
                              <td style="padding-bottom: 30px;">
                                <div style="background: #ffffff; border: 2px solid #C28A17; border-radius: 10px; padding: 25px;">
                                  <h3 style="margin: 0 0 20px 0; color: #C28A17; font-size: 18px; font-weight: 600;">
                                    💬 محتوى الرسالة
                                  </h3>
                                  <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; border-right: 4px solid #C28A17; color: #212529; line-height: 1.7; white-space: pre-line;">
                                    ${message.replace(/\n/g, '<br>')}
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <!-- Call to Action -->
                            <tr>
                              <td style="padding-bottom: 30px; text-align: center;">
                                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #C28A17 0%, #D4AF37 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(194, 138, 23, 0.3);">
                                  📧 الرد على العميل
                                </a>
                              </td>
                            </tr>

                          </table>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #343a40 0%, #495057 100%); padding: 30px 40px; text-align: center;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 20px;">
                                <h3 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                                  نجم راش للمقاولات
                                </h3>
                                <p style="margin: 5px 0 0 0; color: #adb5bd; font-size: 14px;">
                                  شركة متخصصة في المقاولات والإنشاءات
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table cellpadding="0" cellspacing="0" border="0" align="center">
                                  <tr>
                                    <td style="padding: 0 15px;">
                                      <a href="tel:+966123456789" style="color: #C28A17; text-decoration: none; font-size: 14px;">
                                        📞 اتصل بنا
                                      </a>
                                    </td>
                                    <td style="padding: 0 15px; border-left: 1px solid #6c757d; border-right: 1px solid #6c757d;">
                                      <a href="mailto:info@najmrush.com" style="color: #C28A17; text-decoration: none; font-size: 14px;">
                                        ✉️ info@najmrush.com
                                      </a>
                                    </td>
                                    <td style="padding: 0 15px;">
                                      <a href="https://najmrush.com" style="color: #C28A17; text-decoration: none; font-size: 14px;">
                                        🌐 موقعنا
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 20px; border-top: 1px solid #6c757d; margin-top: 20px;">
                                <p style="margin: 0; color: #adb5bd; font-size: 12px; line-height: 1.5;">
                                  تم إرسال هذه الرسالة تلقائياً من خلال نموذج الاتصال في موقع نجم راش للمقاولات<br>
                                  © ${new Date().getFullYear()} نجم راش للمقاولات. جميع الحقوق محفوظة.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        };

        const info = await transporter.sendMail(mailOptions);
        result = { id: info.messageId };
      } catch (smtpError) {
        console.error('SMTP error:', smtpError);

        // محاولة إرسال باستخدام Resend كحل احتياطي
        try {
          console.log('محاولة إرسال باستخدام Resend...');
          const resendResult = await sendWithResend(mailOptions);
          result = { id: resendResult.id, method: 'resend' };
          console.log('تم إرسال البريد بنجاح باستخدام Resend');
        } catch (resendError) {
          console.error('Resend error:', resendError);
          return NextResponse.json(
            { error: `فشل في إرسال الرسالة عبر جميع الطرق المتاحة` },
            { status: 500 }
          );
        }
      }
    } else {
      // محاكاة الإرسال للاختبار المحلي
      console.log('=== محاكاة إرسال بريد إلكتروني ===');
      console.log(`من: ${name} <${email}>`);
      console.log(`إلى: ${recipientEmail}`);
      console.log(`الموضوع: رسالة جديدة من ${name}`);
      console.log(`الرسالة: ${message}`);
      console.log('=====================================');

      result = { id: 'test-' + Date.now() };
    }

    return NextResponse.json({
      message: 'تم إرسال الرسالة بنجاح',
      id: result?.id,
    });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
