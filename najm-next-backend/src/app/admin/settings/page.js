import Link from 'next/link';
import SettingsManager from '../components/SettingsManager';
import CompanyObjectives from '../components/CompanyObjectives';
import ServicesManager from '../components/ServicesManager';
import ServicesPageManager from '../components/ServicesPageManager';
import CertificatesManager from '../components/CertificatesManager';
import TeamManager from '../components/TeamManager';
import PartnersManager from '../components/PartnersManager';
import CustomersManager from '../components/CustomersManager';
import { FaArrowLeft, FaCog } from 'react-icons/fa';

export const metadata = {
  title: 'إدارة الإعدادات | لوحة التحكم',
  description: 'إدارة إعدادات الموقع والمحتوى الثابت',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl">
              <FaCog className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                إدارة الإعدادات
              </h1>
              <p className="text-gray-400 mt-2">تخصيص إعدادات الموقع والمحتوى الثابت</p>
            </div>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-gray-600"
          >
            <FaArrowLeft className="mr-2" />
            العودة للوحة التحكم
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Settings Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <SettingsManager />
          </div>

          {/* Company Objectives Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <CompanyObjectives />
          </div>

          {/* Services Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <ServicesManager />
          </div>

          {/* Services Page Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <ServicesPageManager />
          </div>

          {/* Certificates Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <CertificatesManager />
          </div>

          {/* Team Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <TeamManager />
          </div>

          {/* Partners Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <PartnersManager />
          </div>

          {/* Customers Manager */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-8">
            <CustomersManager />
          </div>
        </div>
      </div>
    </div>
  );
}
