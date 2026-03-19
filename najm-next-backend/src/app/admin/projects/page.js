'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('admin') !== 'true') {
      router.push('/admin');
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      fetchProjects();
      alert('تم حذف المشروع بنجاح!');
    } catch (error) {
      alert('خطأ في حذف المشروع: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl">إدارة المشاريع</h1>
        <Link
          href="/admin/projects/new"
          className="bg-gold text-black px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" />
          إضافة مشروع جديد
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-gray-300">{project.summary}</p>
                <p className="text-sm text-gray-400 mt-2">
                  العميل: {project.client} | السنة: {project.year} | الموقع:{' '}
                  {project.location}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="bg-blue-600 px-3 py-1 rounded flex items-center"
                >
                  <FaEdit className="mr-1" />
                  تعديل
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="bg-red-600 px-3 py-1 rounded flex items-center"
                >
                  <FaTrash className="mr-1" />
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/admin/dashboard" className="bg-gray-600 px-4 py-2 rounded">
          العودة إلى لوحة التحكم
        </Link>
      </div>
    </div>
  );
}
