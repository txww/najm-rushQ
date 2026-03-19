'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaPaperPlane, FaCheckCircle, FaRobot, FaImage, FaFileAlt, FaHistory, FaStar, FaComments, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function WhatsAppPage() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const chatContainerRef = useRef(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+963984966818';
  const companyEmail = process.env.NEXT_PUBLIC_EMAIL || 'info@najmrush.com';
  const companyPhone = process.env.NEXT_PUBLIC_PHONE || '+963984966818';

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

  const quickMessages = [
    'أريد استشارة لمشروع جديد',
    'أحتاج عرض أسعار',
    'متابعة مشروع قائم',
    'معلومات عن الخدمات',
    'زيارة ميدانية',
    'دعم فني'
  ];

  useEffect(() => {
    // تحميل الرسائل المحفوظة من localStorage
    const savedMessages = localStorage.getItem('whatsapp_messages');
    if (savedMessages) {
      setMessageHistory(JSON.parse(savedMessages));
    }

    // مراقبة الـ scroll لإظهار زر العودة لأعلى
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تهيئة الدردشة الآلية
  useEffect(() => {
    if (isChatOpen && chatMessages.length === 0) {
      setChatMessages([
        {
          id: 1,
          text: 'مرحباً! أنا مساعد نجم راش الآلي. كيف يمكنني مساعدتك اليوم؟',
          sender: 'bot',
          time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isChatOpen, chatMessages.length]);

  const generateWhatsAppMessage = () => {
    const baseMessage = `مرحباً، أنا ${name || '[اسمك]'}\n\n`;
    const projectInfo = projectType ? `المشروع: ${projectType}\n\n` : '';
    const customMessage = message ? `الرسالة: ${message}\n\n` : '';
    const footer = 'شكراً لكم - نجم راش للمقاولات';

    return encodeURIComponent(baseMessage + projectInfo + customMessage + footer);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${generateWhatsAppMessage()}`;

    // فتح WhatsApp
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
    setIsLoading(false);

    // إعادة تعيين النموذج بعد 3 ثوان
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage('');
      setName('');
      setProjectType('');
    }, 3000);
  };

  const handleQuickMessage = (quickMsg) => {
    setMessage(quickMsg);
  };

  // دوال الدردشة الجديدة
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      text: chatInput,
      sender: 'user',
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // محاكاة رد البوت
    setTimeout(() => {
      const botResponse = generateBotResponse(chatInput);
      const botMessage = {
        id: chatMessages.length + 2,
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('استشارة') || input.includes('مشروع')) {
      return 'سأقوم بتوجيهك لفريق الاستشارات. يمكنك أيضاً ملء النموذج أعلاه للحصول على استشارة مفصلة.';
    }

    if (input.includes('سعر') || input.includes('تكلفة')) {
      return 'للحصول على عرض أسعار دقيق، يرجى تقديم تفاصيل المشروع. فريقنا سيتواصل معك خلال 24 ساعة.';
    }

    if (input.includes('متابعة') || input.includes('حالة')) {
      return 'لمتابعة مشروعك، يرجى تقديم رقم المشروع أو اسمك. سنقوم بإرسال تحديث فوري.';
    }

    if (input.includes('خدمات') || input.includes('ماذا تقدمون')) {
      return 'نقدم خدمات شاملة: التعهدات الكاملة، التأسيس، التشطيب، الأنظمة الكهربائية، والكاميرات. تفضل بزيارة صفحة خدماتنا.';
    }

    return 'شكراً لتواصلك معنا! فريقنا سيرد عليك في أقرب وقت ممكن. هل يمكنني مساعدتك في شيء آخر؟';
  };

  const saveMessageToHistory = (messageData) => {
    const newHistory = [...messageHistory, {
      ...messageData,
      timestamp: new Date().toISOString()
    }];
    setMessageHistory(newHistory);
    localStorage.setItem('whatsapp_messages', JSON.stringify(newHistory));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>تواصل معنا عبر WhatsApp | نجم راش للمقاولات</title>
        <meta name="description" content="تواصل مع فريق نجم راش للمقاولات عبر WhatsApp للحصول على استشارة فورية ومتابعة مشاريعكم" />
        <meta name="keywords" content="WhatsApp, تواصل, استشارة, نجم راش, مقاولات" />
        <meta property="og:title" content="تواصل معنا عبر WhatsApp" />
        <meta property="og:description" content="استشارة فورية عبر WhatsApp لمشاريعكم الإنشائية" />
        <meta property="og:image" content="/images/whatsapp-hero.jpg" />
        <meta property="og:url" content="/whatsapp" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-green-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-4">
            <div className="flex bg-green-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'form'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-200'
                }`}
              >
                <FaPaperPlane className="inline ml-2" />
                إرسال رسالة
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-200'
                }`}
              >
                <FaComments className="inline ml-2" />
                دردشة فورية
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'history'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-green-700 hover:bg-green-200'
                }`}
              >
                <FaHistory className="inline ml-2" />
                سجل الرسائل
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-green-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/images/whatsapp-pattern.png')] opacity-10"></div>

        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
            <FaWhatsapp className="text-4xl text-white" />
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            تواصل معنا عبر WhatsApp
          </h1>

          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto leading-relaxed">
            نحن هنا لمساعدتكم! احصلوا على استشارة فورية ومتابعة مستمرة لمشاريعكم الإنشائية
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FaWhatsapp className="ml-2 text-xl" />
              ابدأ المحادثة الآن
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <FaEnvelope className="ml-2" />
              أو استخدم النموذج
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Based on Active Tab */}
      {activeTab === 'form' && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* WhatsApp Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  أرسل رسالة سريعة
                </h2>
                <p className="text-gray-600">
                  اختر نوع المشروع وأرسل رسالتك لنتواصل معك فوراً
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    تم إرسال رسالتك بنجاح!
                  </h3>
                  <p className="text-gray-600">
                    سيتم توجيهك إلى WhatsApp الآن...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline ml-2" />
                      اسمك
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع المشروع
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">اختر نوع المشروع (اختياري)</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaPaperPlane className="inline ml-2" />
                      رسالتك
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                      placeholder="اكتب رسالتك هنا..."
                      required
                    />
                  </div>

                  {/* Quick Messages */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">رسائل سريعة:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickMessages.map((quickMsg, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleQuickMessage(quickMsg)}
                          className="px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors border border-green-200"
                        >
                          {quickMsg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        جاري الإرسال...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <FaWhatsapp className="ml-2 text-xl" />
                        إرسال عبر WhatsApp
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  طرق التواصل الأخرى
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center ml-4">
                      <FaWhatsapp className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">WhatsApp</p>
                      <p className="text-green-600 font-mono">{whatsappNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center ml-4">
                      <FaPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">الهاتف</p>
                      <p className="text-blue-600 font-mono">{companyPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center ml-4">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">البريد الإلكتروني</p>
                      <p className="text-purple-600">{companyEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                  <FaClock className="ml-2 text-green-500" />
                  ساعات العمل
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">السبت - الخميس</span>
                    <span className="text-green-600 font-semibold">8:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">الجمعة</span>
                    <span className="text-green-600 font-semibold">8:00 ص - 12:00 م</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">السبت</span>
                    <span className="text-orange-500 font-semibold">إجازة</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm text-green-800 text-center">
                    <strong>ملاحظة:</strong> متوفرون على WhatsApp 24/7 للطوارئ والاستفسارات المهمة
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  إجراءات سريعة
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/services"
                    className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors border border-blue-200"
                  >
                    <FaMapMarkerAlt className="ml-2" />
                    خدماتنا
                  </Link>

                  <Link
                    href="/projects"
                    className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors border border-purple-200"
                  >
                    <FaMapMarkerAlt className="ml-2" />
                    مشاريعنا
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors border border-green-200"
                  >
                    <FaEnvelope className="ml-2" />
                    اتصل بنا
                  </Link>

                  <Link
                    href="/about"
                    className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl transition-colors border border-orange-200"
                  >
                    <FaUser className="ml-2" />
                    من نحن
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Chat Tab Content */}
      {activeTab === 'chat' && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  دردشة فورية مع مساعدنا الآلي
                </h2>
                <p className="text-gray-600">
                  احصل على إجابات سريعة أو اترك رسالة لفريقنا
                </p>
              </div>

              {/* Chat Interface */}
              <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-4">
                      <FaRobot className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">مساعد نجم راش</h3>
                      <p className="text-green-100 text-sm">متوفر الآن للمساعدة</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50"
                >
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-green-500 text-white rounded-br-sm'
                            : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleChatSubmit} className="p-6 bg-white border-t border-gray-100">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-medium"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </div>

              {/* Quick Questions */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  أسئلة شائعة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'ما هي خدماتكم؟',
                    'كيف أحصل على عرض أسعار؟',
                    'ما هي مدة تنفيذ المشروع؟',
                    'هل تقدمون ضمان؟',
                    'كيف يمكنني متابعة المشروع؟',
                    'ما هي طرق الدفع؟'
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setChatInput(question)}
                      className="p-4 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-xl border border-gray-200 hover:border-green-300 transition-all text-right"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* History Tab Content */}
      {activeTab === 'history' && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  سجل الرسائل والمحادثات
                </h2>
                <p className="text-gray-600">
                  تتبع جميع رسائلك ومحادثاتك معنا
                </p>
              </div>

              {messageHistory.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
                  <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    لا توجد رسائل سابقة
                  </h3>
                  <p className="text-gray-500">
                    ابدأ محادثة جديدة لتظهر هنا
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messageHistory.map((msg, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-gray-800">{msg.name || 'مستخدم'}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(msg.timestamp).toLocaleDateString('ar-SA')} - {new Date(msg.timestamp).toLocaleTimeString('ar-SA')}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            msg.status === 'sent' ? 'bg-green-100 text-green-700' :
                            msg.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {msg.status === 'sent' ? 'مرسلة' :
                             msg.status === 'delivered' ? 'وصلت' : 'في الانتظار'}
                          </span>
                        </div>
                      </div>

                      {msg.projectType && (
                        <p className="text-sm text-blue-600 mb-2">
                          <strong>نوع المشروع:</strong> {msg.projectType}
                        </p>
                      )}

                      <p className="text-gray-700 leading-relaxed">{msg.message}</p>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setMessage(msg.message);
                            setName(msg.name);
                            setProjectType(msg.projectType);
                            setActiveTab('form');
                          }}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          إعادة إرسال
                        </button>

                        <div className="flex items-center text-sm text-gray-500">
                          <FaStar className="ml-1 text-yellow-400" />
                          مهمة
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              آراء عملائنا
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              شهادات من عملاءنا عن تجربة التواصل معنا عبر WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center ml-4">
                  <span className="text-white font-bold">أ.م</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">أحمد محمد</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "التواصل عبر WhatsApp مع فريق نجم راش كان ممتازاً. ردود سريعة ومتابعة مستمرة للمشروع من البداية للنهاية."
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center ml-4">
                  <span className="text-white font-bold">ف.ع</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">فاطمة علي</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "أحببت إمكانية إرسال الصور والمخططات مباشرة عبر WhatsApp. سهل التواصل وواضح دائماً."
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center ml-4">
                  <span className="text-white font-bold">م.ع</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">محمد عبدالله</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "متوفرون على WhatsApp حتى في أوقات متأخرة. هذا يعطي ثقة كبيرة في التعامل معهم."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              إجابات على الأسئلة الأكثر شيوعاً حول التواصل معنا
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                كم من الوقت يستغرق الرد على الرسائل؟
              </h3>
              <p className="text-gray-600 leading-relaxed">
                نرد على جميع الرسائل خلال 30 دقيقة كحد أقصى خلال ساعات العمل، وقد نرد فوراً في معظم الحالات.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                هل يمكنني إرسال صور وملفات عبر WhatsApp؟
              </h3>
              <p className="text-gray-600 leading-relaxed">
                نعم، يمكنك إرسال الصور، المخططات، والملفات بجميع أنواعها. هذا يساعدنا في فهم احتياجاتكم بشكل أفضل.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                هل التواصل آمن عبر WhatsApp؟
              </h3>
              <p className="text-gray-600 leading-relaxed">
                نعم، WhatsApp يوفر تشفيراً شاملاً لجميع المحادثات. جميع معلوماتكم آمنة وسرية.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                ماذا لو كان لدي مشروع طارئ؟
              </h3>
              <p className="text-gray-600 leading-relaxed">
                متوفرون على WhatsApp 24/7 للحالات الطارئة والاستفسارات المهمة. لا تترددوا في التواصل في أي وقت.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
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