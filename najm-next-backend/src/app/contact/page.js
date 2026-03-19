'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import emailjs from '@emailjs/browser';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaPaperPlane, FaCheckCircle, FaWhatsapp, FaFacebook, FaInstagram, FaGlobe, FaStar, FaComments, FaTimes, FaArrowUp, FaQuestionCircle, FaBuilding, FaHandshake, FaRocket } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: '',
    urgency: 'normal'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [settings, setSettings] = useState({});

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+963984966818';
  const companyEmail = process.env.NEXT_PUBLIC_EMAIL || 'info@najmrush.com';
  const companyPhone = process.env.NEXT_PUBLIC_PHONE || '+963984966818';

  // إعدادات EmailJS
  const EMAILJS_SERVICE_ID = 'service_your_service_id';
  const EMAILJS_TEMPLATE_ID = 'template_your_template_id';
  const EMAILJS_PUBLIC_KEY = 'your_public_key';

  useEffect(() => {
    fetchSettings();

    // مراقبة الـ scroll لإظهار زر العودة لأعلى
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // محاولة إرسال باستخدام EmailJS أولاً
      if (EMAILJS_SERVICE_ID !== 'service_your_service_id') {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'لم يتم تحديد',
          subject: formData.subject,
          project_type: formData.projectType || 'لم يتم تحديد',
          urgency: formData.urgency,
          message: formData.message,
          to_email: companyEmail,
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );

        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          projectType: '',
          urgency: 'normal'
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        // استخدام API كبديل
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            projectType: '',
            urgency: 'normal'
          });
          setTimeout(() => setIsSubmitted(false), 5000);
        } else {
          const errorData = await response.json();
          alert(`فشل في إرسال الرسالة: ${errorData.error}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);

      // محاولة إرسال باستخدام API كبديل إذا فشل EmailJS
      if (EMAILJS_SERVICE_ID !== 'service_your_service_id') {
        try {
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            setIsSubmitted(true);
            setFormData({
              name: '',
              email: '',
              phone: '',
              subject: '',
              message: '',
              projectType: '',
              urgency: 'normal'
            });
            setTimeout(() => setIsSubmitted(false), 5000);
          } else {
            const errorData = await response.json();
            alert(`فشل في إرسال الرسالة: ${errorData.error}`);
          }
        } catch (apiError) {
          console.error('API Error:', apiError);
          alert('حدث خطأ في الإرسال. يرجى المحاولة لاحقاً أو التواصل عبر WhatsApp.');
        }
      } else {
        alert('حدث خطأ في الإرسال. يرجى المحاولة لاحقاً أو التواصل عبر WhatsApp.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickContacts = [
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      value: whatsappNumber,
      link: `https://wa.me/${whatsappNumber.replace('+', '')}`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      icon: FaPhone,
      title: 'الهاتف',
      value: companyPhone,
      link: `tel:${companyPhone}`,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      icon: FaEnvelope,
      title: 'البريد الإلكتروني',
      value: companyEmail,
      link: `mailto:${companyEmail}`,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'الموقع',
      value: 'سوريا - دمشق',
      link: '#location',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  const projectTypes = [
    'التعهدات الكاملة',
    'التأسيس والتخطيط',
    'الإكساء والتشطيب',
    'أنظمة الكاميرات',
    'الأعمال الكهربائية',
    'الأعمال الصحية',
    'استشارة هندسية',
    'تصميم داخلي',
    'صيانة وإصلاح',
    'أخرى'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'منخفضة', color: 'text-green-600' },
    { value: 'normal', label: 'عادية', color: 'text-blue-600' },
    { value: 'high', label: 'عالية', color: 'text-orange-600' },
    { value: 'urgent', label: 'عاجلة', color: 'text-red-600' }
  ];

  return (
    <>
      <Head>
        <title>تواصل معنا | نجم راش للمقاولات</title>
        <meta name="description" content="تواصل مع شركة نجم راش للمقاولات. نحن هنا للإجابة على استفساراتك وتنفيذ مشاريعك الإنشائية." />
        <meta name="keywords" content="تواصل, اتصال, استفسار, مشروع, نجم راش, مقاولات" />
        <meta property="og:title" content="تواصل مع شركة نجم راش" />
        <meta property="og:description" content="نحن هنا لخدمتك في جميع مشاريعك الإنشائية" />
        <meta property="og:url" content="/contact" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-blue-200 shadow-sm">
          <div className="container mx-auto px-6">
            <div className="flex justify-center py-4">
              <div className="flex bg-blue-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'form'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <FaPaperPlane className="inline ml-2" />
                  نموذج الاتصال
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'info'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <FaBuilding className="inline ml-2" />
                  معلومات الشركة
                </button>
                <button
                  onClick={() => setActiveTab('faq')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'faq'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <FaQuestionCircle className="inline ml-2" />
                  الأسئلة الشائعة
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('/images/contact-hero.jpg')] opacity-10"></div>

          <div className="relative container mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
              <FaComments className="text-4xl text-white" />
            </div>

            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              تواصل معنا
            </h1>

            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              نحن هنا لخدمتك! تواصل مع فريقنا المتخصص للحصول على استشارة مجانية ومتابعة مشاريعك
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaWhatsapp className="ml-2 text-xl" />
                تواصل عبر WhatsApp
              </a>

              <Link
                href="/whatsapp"
                className="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <FaComments className="ml-2" />
                صفحة WhatsApp
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content Based on Active Tab */}
        {activeTab === 'form' && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        أرسل رسالة لنا
                      </h2>
                      <p className="text-gray-600">
                        املأ النموذج التالي وسنتواصل معك في أقرب وقت ممكن
                      </p>
                    </div>

                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          تم إرسال رسالتك بنجاح!
                        </h3>
                        <p className="text-gray-600">
                          شكراً لتواصلك معنا. سنقوم بالرد عليك خلال 24 ساعة.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <FaUser className="inline ml-2" />
                              الاسم الكامل *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="أدخل اسمك الكامل"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <FaEnvelope className="inline ml-2" />
                              البريد الإلكتروني *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="example@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <FaPhone className="inline ml-2" />
                              رقم الهاتف
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="+963 XXX XXX XXX"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              نوع المشروع
                            </label>
                            <select
                              name="projectType"
                              value={formData.projectType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                              <option value="">اختر نوع المشروع (اختياري)</option>
                              {projectTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            درجة الاستعجال
                          </label>
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            {urgencyLevels.map((level) => (
                              <option key={level.value} value={level.value}>
                                {level.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            موضوع الرسالة *
                          </label>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="اكتب موضوع رسالتك"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaPaperPlane className="inline ml-2" />
                            تفاصيل الرسالة *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="اكتب رسالتك بالتفصيل..."
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              جاري الإرسال...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <FaPaperPlane className="ml-2 text-xl" />
                              إرسال الرسالة
                            </div>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Quick Contact Methods */}
                <div className="space-y-6">
                  {/* Contact Methods */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      طرق التواصل السريع
                    </h3>

                    <div className="space-y-4">
                      {quickContacts.map((contact, index) => (
                        <a
                          key={index}
                          href={contact.link}
                          target={contact.link.startsWith('http') ? '_blank' : '_self'}
                          rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          className={`${contact.bgColor} p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all block`}
                        >
                          <div className="flex items-center">
                            <div className={`w-12 h-12 ${contact.color.replace('from-', 'bg-gradient-to-r from-').replace('to-', 'to-')} rounded-full flex items-center justify-center ml-4`}>
                              <contact.icon className="text-white text-xl" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">{contact.title}</p>
                              <p className={`${contact.textColor} font-mono text-sm`}>{contact.value}</p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                      <FaClock className="ml-2 text-blue-500" />
                      ساعات العمل
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">السبت - الخميس</span>
                        <span className="text-blue-600 font-semibold">8:00 ص - 6:00 م</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">الجمعة</span>
                        <span className="text-blue-600 font-semibold">8:00 ص - 12:00 م</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">السبت</span>
                        <span className="text-orange-500 font-semibold">إجازة</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-800 text-center">
                        <strong>ملاحظة:</strong> متوفرون على WhatsApp 24/7 للطوارئ والاستفسارات المهمة
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      إجراءات سريعة
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      <Link
                        href="/services"
                        className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors border border-blue-200"
                      >
                        <FaRocket className="ml-2" />
                        خدماتنا
                      </Link>

                      <Link
                        href="/projects"
                        className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors border border-purple-200"
                      >
                        <FaBuilding className="ml-2" />
                        مشاريعنا
                      </Link>

                      <Link
                        href="/whatsapp"
                        className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors border border-green-200"
                      >
                        <FaWhatsapp className="ml-2" />
                        WhatsApp
                      </Link>

                      <Link
                        href="/about"
                        className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl transition-colors border border-orange-200"
                      >
                        <FaHandshake className="ml-2" />
                        من نحن
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Company Info Tab */}
        {activeTab === 'info' && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    معلومات الشركة
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    تعرف على شركة نجم راش للمقاولات وخدماتنا المتكاملة
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Company Overview */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      عن الشركة
                    </h3>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        شركة نجم راش للمقاولات هي شركة متخصصة في تنفيذ أعمال المقاولات والتعهدات الكاملة من مرحلة التأسيس وحتى التسليم بالمفتاح.
                      </p>
                      <p>
                        نتميز بالدقة والجودة في جميع أعمال البلاط، الغرانيت، التشطيبات، والأنظمة التقنية. نقدم حلولاً متكاملة لجميع احتياجاتكم الإنشائية.
                      </p>
                      <p>
                        فريقنا من المهندسين والفنيين المؤهلين يضمن تنفيذ المشاريع بأعلى معايير الجودة والسلامة.
                      </p>
                    </div>
                  </div>

                  {/* Services Overview */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      خدماتنا الرئيسية
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'التعهدات الكاملة',
                        'التأسيس والتخطيط',
                        'الإكساء والتشطيب',
                        'أنظمة الكاميرات',
                        'الأعمال الكهربائية',
                        'الأعمال الصحية',
                        'التصميم الداخلي',
                        'الصيانة والإصلاح'
                      ].map((service, index) => (
                        <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <FaCheckCircle className="text-blue-500 ml-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Choose Us */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      لماذا تختار نجم راش؟
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <FaStar className="text-yellow-400 mt-1 ml-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-800">خبرة واسعة</h4>
                          <p className="text-gray-600 text-sm">أكثر من 15 عاماً في مجال المقاولات</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaStar className="text-yellow-400 mt-1 ml-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-800">جودة عالية</h4>
                          <p className="text-gray-600 text-sm">معايير عالمية في جميع الأعمال</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaStar className="text-yellow-400 mt-1 ml-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-800">ضمان شامل</h4>
                          <p className="text-gray-600 text-sm">ضمان على جميع الأعمال المنفذة</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaStar className="text-yellow-400 mt-1 ml-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-800">أسعار تنافسية</h4>
                          <p className="text-gray-600 text-sm">أفضل الأسعار مع أعلى جودة</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      معلومات التواصل
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <FaMapMarkerAlt className="text-red-500 ml-3" />
                        <div>
                          <p className="font-semibold text-gray-800">العنوان</p>
                          <p className="text-gray-600">سوريا - دمشق</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <FaPhone className="text-blue-500 ml-3" />
                        <div>
                          <p className="font-semibold text-gray-800">الهاتف</p>
                          <p className="text-gray-600">{companyPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <FaEnvelope className="text-purple-500 ml-3" />
                        <div>
                          <p className="font-semibold text-gray-800">البريد</p>
                          <p className="text-gray-600">{companyEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <FaWhatsapp className="text-green-500 ml-3" />
                        <div>
                          <p className="font-semibold text-gray-800">WhatsApp</p>
                          <p className="text-gray-600">{whatsappNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    الأسئلة الشائعة
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا وطرق التواصل
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      كم من الوقت يستغرق الرد على الاستفسارات؟
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      نرد على جميع الاستفسارات خلال 24 ساعة كحد أقصى خلال أيام العمل. أما الاستفسارات العاجلة فترد عليها فوراً عبر WhatsApp.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      هل تقدمون زيارة ميدانية للموقع؟
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      نعم، نقدم زيارات ميدانية مجانية لتقييم الموقع وتحديد الاحتياجات. يمكنك طلب الزيارة عبر الاتصال بنا أو إرسال رسالة تفصيلية.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      هل يمكنني الحصول على عرض أسعار تقريبي؟
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      نعم، نقدم عروض أسعار تقريبية مجاناً. للحصول على عرض دقيق، نحتاج إلى زيارة الموقع أو تقديم مخططات وتفاصيل المشروع.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      ما هي طرق الدفع المتاحة؟
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      نقبل جميع طرق الدفع: نقدي، تحويل بنكي، شيكات، وبطاقات الائتمان. يمكننا أيضاً تقسيط المبلغ حسب حجم المشروع.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      هل تقدمون ضمان على الأعمال؟
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      نعم، نقدم ضمان شامل على جميع الأعمال لمدة عام كامل. كما نقدم ضمان إضافي على المواد المستخدمة حسب نوعها.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      كيف يمكنني متابعة سير العمل في مشروعي؟
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      يمكنك متابعة المشروع عبر تقارير دورية، صور فوتوغرافية، أو زيارات ميدانية. كما نوفر تطبيق خاص لمتابعة المشاريع عن بعد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
          >
            <FaArrowUp />
          </button>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">نجم راش للمقاولات</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                شركة متخصصة في تنفيذ أعمال المقاولات والتعهدات الكاملة من مرحلة التأسيس وحتى التسليم بالمفتاح.
              </p>

              <div className="flex justify-center space-x-6 space-x-reverse mb-8">
                <a
                  href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <FaWhatsapp className="text-2xl" />
                </a>
                <a
                  href={`tel:${companyPhone}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FaPhone className="text-2xl" />
                </a>
                <a
                  href={`mailto:${companyEmail}`}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
              </div>

              <div className="border-t border-gray-700 pt-8">
                <p className="text-gray-400">
                  © 2025 نجم راش للمقاولات. جميع الحقوق محفوظة.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
