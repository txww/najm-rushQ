'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('admin', 'true');
      router.push('/admin/dashboard');
    } else {
      alert('كلمة مرور خاطئة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
        <h1 className="text-white text-2xl mb-4">دخول الإدارة</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          className="w-full p-2 mb-4 bg-gray-700 text-white"
        />
        <button type="submit" className="w-full bg-gold text-black p-2">
          دخول
        </button>
      </form>
    </div>
  );
}
