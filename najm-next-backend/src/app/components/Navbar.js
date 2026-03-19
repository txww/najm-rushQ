'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    setMounted(true);
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
  const facebookUrl = settings.facebook_url || '#';
  const instagramUrl = settings.instagram_url || '#';
  const twitterUrl = settings.twitter_url || '#';
  const linkedinUrl = settings.linkedin_url || '#';

  // Dynamically import icons to avoid hydration mismatch
  const SunIcon = () => {
    const [Icon, setIcon] = useState(null);

    useEffect(() => {
      import('react-icons/fa').then((module) => {
        setIcon(() => module.FaSun);
      });
    }, []);

    return Icon ? (
      <Icon className="text-yellow-400" />
    ) : (
      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
    );
  };

  const MoonIcon = () => {
    const [Icon, setIcon] = useState(null);

    useEffect(() => {
      import('react-icons/fa').then((module) => {
        setIcon(() => module.FaMoon);
      });
    }, []);

    return Icon ? (
      <Icon className="text-gray-300" />
    ) : (
      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
    );
  };

  if (!mounted) {
    return null; // or a loading placeholder
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[rgba(11,18,32,0.55)] backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <img
            src="/images/logo33.png"
            alt="شعار نجم راش"
            className="w-14 h-14 rounded-md border border-[rgba(194,138,23,0.12)] bg-white/10 object-cover"
          />
          <div>
            <div className="text-xl font-extrabold text-[var(--brand-gold,#C28A17)]">
              شركة نجم راش
            </div>
            <div className="text-sm text-white/70">مقاولات وتعهدات A-Z</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-white/90">
          <Link
            href="/"
            className="hover:text-[var(--brand-gold,#C28A17)] transition"
          >
            الرئيسية
          </Link>
          <Link
            href="/about"
            className="hover:text-[var(--brand-gold,#C28A17)] transition"
          >
            عن الشركة
          </Link>
          <Link
            href="/services"
            className="hover:text-[var(--brand-gold,#C28A17)] transition"
          >
            خدماتنا
          </Link>
          <Link
            href="/projects"
            className="hover:text-[var(--brand-gold,#C28A17)] transition"
          >
            مشاريعنا
          </Link>
          <Link
            href="/#sections"
            className="hover:text-[var(--brand-gold,#C28A17)] transition"
          >
            قسم المواد
          </Link>
          <Link
            href="/contact"
            className="hover:text-[var(--brand-gold,#C28A17)] transition"
          >
            تواصل معنا
          </Link>
          <Link
            href="/whatsapp"
            className="hover:text-[var(--brand-gold,#C28A17)] transition flex items-center gap-2"
          >
            <FaWhatsapp className="text-green-400" />
            WhatsApp
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            aria-label="تبديل الثيم"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Social Media Icons */}
          <div className="hidden md:flex items-center gap-2 mr-4">
            {facebookUrl !== '#' && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#1877F2] transition text-white"
                title="فيسبوك"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
            )}

            {instagramUrl !== '#' && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-[#833AB4] hover:to-[#FD1D1D] transition text-white"
                title="إنستغرام"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            )}

            {twitterUrl !== '#' && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#1DA1F2] transition text-white"
                title="تويتر"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            )}

            {linkedinUrl !== '#' && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-[#0077B5] transition text-white"
                title="لينكدإن"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--brand-success,#16A34A)] text-white px-4 py-2 rounded-lg shadow-soft hover:bg-green-600 transition"
          >
            <FaWhatsapp />
            واتساب
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white px-3 py-2 rounded"
        >
          {open ? 'إغلاق' : 'قائمة'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[rgba(11,18,32,0.95)] border-t border-white/10 p-4 space-y-2 text-white">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block p-3 rounded hover:bg-white/5"
          >
            الرئيسية
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block p-3 rounded hover:bg-white/5"
          >
            عن الشركة
          </Link>
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="block p-3 rounded hover:bg-white/5"
          >
            خدماتنا
          </Link>
          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="block p-3 rounded hover:bg-white/5"
          >
            مشاريعنا
          </Link>
          <Link
            href="/#sections"
            onClick={() => setOpen(false)}
            className="block p-3 rounded hover:bg-white/5"
          >
            قسم المواد
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block p-3 rounded hover:bg-white/5"
          >
            تواصل معنا
          </Link>
          <Link
            href="/whatsapp"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 p-3 rounded hover:bg-white/5"
          >
            <FaWhatsapp className="text-green-400" />
            WhatsApp
          </Link>

          {/* Social Media Mobile */}
          <div className="flex justify-center gap-3 py-3 border-t border-white/10 mt-3">
            {facebookUrl !== '#' && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1877F2] text-white"
                title="فيسبوك"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            )}

            {instagramUrl !== '#' && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] text-white"
                title="إنستغرام"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            )}

            {twitterUrl !== '#' && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#1DA1F2] text-white"
                title="تويتر"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            )}

            {linkedinUrl !== '#' && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0077B5] text-white"
                title="لينكدإن"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* WhatsApp Mobile */}
          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--brand-success,#16A34A)] text-white py-3 px-3 rounded flex items-center justify-center gap-2 mt-2"
          >
            <FaWhatsapp />
            واتساب
          </a>
        </div>
      )}
    </nav>
  );
}
