'use client'; // مهم لأننا نستخدم متغيرات بيئية و react-icons و API

import { useState, useEffect } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTelegram,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';

export default function Footer() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const WA =
    settings.whatsapp_number ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '123456789';
  const email = settings.email || 'info@najmrush.com';
  const secondaryEmail =
    settings.company_email_secondary || 'support@najmrush.com';
  const phone = settings.phone || '+966112345678';
  const emergencyPhone = settings.emergency_phone || '+966501234567';
  const address =
    settings.company_address || 'الرياض، المملكة العربية السعودية';
  const workingHours =
    settings.working_hours || 'الأحد - الخميس: 8:00 ص - 6:00 م';

  // وسائل التواصل الاجتماعي
  const facebookUrl = settings.facebook_url || '#';
  const instagramUrl = settings.instagram_url || '#';
  const twitterUrl = settings.twitter_url || '#';
  const linkedinUrl = settings.linkedin_url || '#';
  const youtubeUrl = settings.youtube_url || '#';
  const tiktokUrl = settings.tiktok_url || '#';
  const telegramUrl = settings.telegram_channel || '#';

  const companyDescription =
    settings.footer_description ||
    settings.company_vision ||
    'شركة متخصصة في تنفيذ أعمال المقاولات والتعهدات الكاملة من مرحلة التأسيس وحتى التسليم بالمفتاح. نتميز بالدقة والجودة في جميع أعمال البلاط، الغرانيت، التشطيبات، والأنظمة التقنية.';

  return (
    <footer
      className="
        mt-20 
        bg-gradient-to-b from-[#0B1220] to-[#060A13]
        border-t border-white/5
        pt-14 pb-10
      "
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 1 — وصف الشركة */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[var(--brand-gold,#C28A17)]">
            {settings.company_name || 'شركة نجم راش للمقاولات'}
          </h3>
          <p className="text-sm text-white/75 leading-relaxed max-w-sm">
            {companyDescription}
          </p>

          {/* معلومات الاتصال السريعة */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2">
              <FaPhone className="text-[var(--brand-gold,#C28A17)] text-sm" />
              <span className="text-white/80 text-sm">{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[var(--brand-gold,#C28A17)] text-sm" />
              <span className="text-white/80 text-sm">{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-[var(--brand-gold,#C28A17)] text-sm" />
              <span className="text-white/80 text-sm">{workingHours}</span>
            </div>
          </div>
        </div>

        {/* 2 — الروابط */}
        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-semibold text-white/90 mb-1">
            روابط مهمة
          </h4>
          <a href="/" className="footer-link">
            الرئيسية
          </a>
          <a href="/about" className="footer-link">
            عن الشركة
          </a>
          <a href="/#services" className="footer-link">
            خدماتنا
          </a>
          <a href="/projects" className="footer-link">
            مشاريعنا
          </a>
          <a href="/contact" className="footer-link">
            اتصل بنا
          </a>
        </div>

        {/* 3 — وسائل التواصل الاجتماعي */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-white/90">تابعنا</h4>

          <div className="grid grid-cols-3 gap-3">
            {facebookUrl !== '#' && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon bg-[#1877F2] hover:bg-[#166FE5]"
                title="فيسبوك"
              >
                <FaFacebook />
              </a>
            )}

            {instagramUrl !== '#' && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] hover:from-[#7329A4] hover:to-[#E01515]"
                title="إنستغرام"
              >
                <FaInstagram />
              </a>
            )}

            {twitterUrl !== '#' && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon bg-[#1DA1F2] hover:bg-[#0D95E8]"
                title="تويتر"
              >
                <FaTwitter />
              </a>
            )}

            {linkedinUrl !== '#' && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon bg-[#0077B5] hover:bg-[#005885]"
                title="لينكدإن"
              >
                <FaLinkedin />
              </a>
            )}

            {youtubeUrl !== '#' && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon bg-[#FF0000] hover:bg-[#E60000]"
                title="يوتيوب"
              >
                <FaYoutube />
              </a>
            )}

            {tiktokUrl !== '#' && (
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon bg-black hover:bg-gray-800"
                title="تيك توك"
              >
                <FaTiktok />
              </a>
            )}

            {telegramUrl !== '#' && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon bg-[#0088CC] hover:bg-[#006699]"
                title="تليغرام"
              >
                <FaTelegram />
              </a>
            )}

            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon bg-[#25D366] hover:bg-[#128C7E]"
              title="واتساب"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* 4 — معلومات الاتصال */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-white/90">تواصل معنا</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[var(--brand-gold,#C28A17)] text-lg" />
              <div className="flex flex-col">
                <a
                  href={`mailto:${email}`}
                  className="text-white/80 hover:text-white transition text-sm"
                >
                  {email}
                </a>
                {secondaryEmail !== email && (
                  <a
                    href={`mailto:${secondaryEmail}`}
                    className="text-white/60 hover:text-white/80 transition text-xs"
                  >
                    {secondaryEmail}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaPhone className="text-[var(--brand-gold,#C28A17)] text-lg" />
              <div className="flex flex-col">
                <a
                  href={`tel:${phone}`}
                  className="text-white/80 hover:text-white transition text-sm"
                >
                  {phone}
                </a>
                {emergencyPhone !== phone && (
                  <span className="text-white/60 text-xs">
                    طوارئ: {emergencyPhone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-white/50 mt-3">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - نجم راش للمقاولات
          </p>
        </div>
      </div>
    </footer>
  );
}
