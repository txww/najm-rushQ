import Link from 'next/link';
import { FaArrowLeft, FaChartLine, FaUsers, FaEye, FaCalendarAlt, FaDownload } from 'react-icons/fa';

export const metadata = {
  title: 'التقارير والإحصائيات | لوحة التحكم',
  description: 'عرض التقارير والإحصائيات التفصيلية',
};

export default function ReportsPage() {
  // بيانات تجريبية - يمكن ربطها بقاعدة البيانات لاحقاً
  const reports = {
    monthlyStats: {
      visitors: 15420,
      pageViews: 45230,
      uniqueUsers: 8920,
      bounceRate: 34.5,
      avgSessionDuration: '3:24'
    },
    topPages: [
      { page: 'الصفحة الرئيسية', views: 12450, percentage: 27.5 },
      { page: 'المواد', views: 8920, percentage: 19.7 },
      { page: 'المشاريع', views: 6780, percentage: 15.0 },
      { page: 'تواصل معنا', views: 5430, percentage: 12.0 },
      { page: 'حول الشركة', views: 4320, percentage: 9.5 }
    ],
    trafficSources: [
      { source: 'محركات البحث', visitors: 8920, percentage: 57.8 },
      { source: 'الروابط المباشرة', visitors: 3240, percentage: 21.0 },
      { source: 'وسائل التواصل', visitors: 2160, percentage: 14.0 },
      { source: 'إعلانات', visitors: 1100, percentage: 7.2 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl">
              <FaChartLine className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                التقارير والإحصائيات
              </h1>
              <p className="text-gray-400 mt-2">تحليلات مفصلة لأداء الموقع</p>
            </div>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <FaDownload className="mr-2" />
              تصدير التقرير
            </button>
            <Link
              href="/admin/dashboard"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-600"
            >
              <FaArrowLeft className="mr-2" />
              العودة للوحة التحكم
            </Link>
          </div>
        </div>

        {/* إحصائيات شهرية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-100">الزوار</h3>
                <p className="text-4xl font-bold text-white mt-2">{reports.monthlyStats.visitors.toLocaleString()}</p>
                <p className="text-blue-200 text-sm mt-1">+12.5% من الشهر الماضي</p>
              </div>
              <FaUsers className="text-5xl text-blue-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-100">مشاهدات الصفحات</h3>
                <p className="text-4xl font-bold text-white mt-2">{reports.monthlyStats.pageViews.toLocaleString()}</p>
                <p className="text-green-200 text-sm mt-1">+8.2% من الشهر الماضي</p>
              </div>
              <FaEye className="text-5xl text-green-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-100">المستخدمون الفريدون</h3>
                <p className="text-4xl font-bold text-white mt-2">{reports.monthlyStats.uniqueUsers.toLocaleString()}</p>
                <p className="text-purple-200 text-sm mt-1">+15.3% من الشهر الماضي</p>
              </div>
              <FaUsers className="text-5xl text-purple-200 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-orange-100">متوسط مدة الجلسة</h3>
                <p className="text-4xl font-bold text-white mt-2">{reports.monthlyStats.avgSessionDuration}</p>
                <p className="text-orange-200 text-sm mt-1">+5.1% من الشهر الماضي</p>
              </div>
              <FaCalendarAlt className="text-5xl text-orange-200 opacity-80" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* أكثر الصفحات زيارة */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaEye className="mr-3 text-gold" />
              أكثر الصفحات زيارة
            </h2>
            <div className="space-y-4">
              {reports.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{page.page}</p>
                    <p className="text-gray-400 text-sm">{page.views.toLocaleString()} مشاهدة</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-bold">{page.percentage}%</p>
                    <div className="w-20 bg-gray-600 rounded-full h-2 mt-1">
                      <div
                        className="bg-gold h-2 rounded-full"
                        style={{ width: `${page.percentage * 2}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* مصادر الزيارات */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaChartLine className="mr-3 text-gold" />
              مصادر الزيارات
            </h2>
            <div className="space-y-4">
              {reports.trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{source.source}</p>
                    <p className="text-gray-400 text-sm">{source.visitors.toLocaleString()} زائر</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-bold">{source.percentage}%</p>
                    <div className="w-20 bg-gray-600 rounded-full h-2 mt-1">
                      <div
                        className="bg-gold h-2 rounded-full"
                        style={{ width: `${source.percentage * 2}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ملاحظة */}
        <div className="mt-12 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6">
          <p className="text-yellow-200 text-center">
            ℹ️ هذه البيانات تجريبية. للحصول على إحصائيات دقيقة، يرجى ربط الموقع بأدوات تحليلات مثل Google Analytics.
          </p>
        </div>
      </div>
    </div>
  );
}