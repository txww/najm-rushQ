'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

export default function EditProject() {
  const [project, setProject] = useState(null);
  const [file, setFile] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const router = useRouter();
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (localStorage.getItem('admin') !== 'true') {
      router.push('/admin');
    }
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}`);
      const data = await res.json();
      setProject(data);
      setTestimonials(data.testimonials || []);
      setValue('title', data.title);
      setValue('summary', data.summary);
      setValue('client', data.client);
      setValue('location', data.location);
      setValue('year', data.year);
      setValue('area', data.area);
      setValue('floors', data.floors);
      setValue('status', data.status);
      setValue('mapLocation', data.mapLocation);
      setValue(
        'features',
        data.features ? data.features.split(',').join(',') : ''
      );
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return { url: project?.image || '', fileId: null };
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return { url: data.imageUrl, fileId: data.fileId };
  };

  const onSubmit = async (data) => {
    try {
      const { url: imageUrl, fileId: imageFileId } = await uploadFile();

      // Convert features string to array
      const featuresArray = data.features
        ? data.features
            .split(',')
            .map((f) => f.trim())
            .filter((f) => f)
        : [];

      const body = {
        ...data,
        features: featuresArray,
        image: imageUrl,
        ...(imageFileId && { imageFileId }),
        testimonials: testimonials,
      };

      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('تم تحديث المشروع بنجاح!');
        router.push('/admin/projects');
      } else {
        const errorData = await response.json();
        alert('خطأ في التحديث: ' + errorData.error);
      }
    } catch (error) {
      alert('خطأ: ' + error.message);
    }
  };

  const addTestimonial = () => {
    setEditingTestimonial({
      id: Date.now().toString(),
      name: '',
      feedback: '',
    });
  };

  const editTestimonial = (testimonial) => {
    setEditingTestimonial({ ...testimonial });
  };

  const saveTestimonial = () => {
    if (
      editingTestimonial.id &&
      testimonials.find((t) => t.id === editingTestimonial.id)
    ) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === editingTestimonial.id ? editingTestimonial : t
        )
      );
    } else {
      setTestimonials([...testimonials, editingTestimonial]);
    }
    setEditingTestimonial(null);
  };

  const deleteTestimonial = (testimonialId) => {
    setTestimonials(testimonials.filter((t) => t.id !== testimonialId));
  };

  if (!project)
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        جاري التحميل...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl">تعديل المشروع</h1>
        <Link
          href="/admin/projects"
          className="bg-gray-600 px-4 py-2 rounded flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          العودة
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-2">العنوان</label>
            <input
              {...register('title')}
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">العميل</label>
            <input
              {...register('client')}
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">الموقع</label>
            <input
              {...register('location')}
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">السنة</label>
            <input
              {...register('year')}
              type="number"
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">المساحة</label>
            <input
              {...register('area')}
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">عدد الطوابق</label>
            <input
              {...register('floors')}
              type="number"
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">الحالة</label>
            <input
              {...register('status')}
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">موقع الخريطة</label>
            <input
              {...register('mapLocation')}
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">الصورة</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">المميزات (مفصولة بفواصل)</label>
            <input
              {...register('features')}
              className="w-full p-2 bg-gray-700 text-white"
              placeholder="ميزة1,ميزة2,ميزة3"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">الملخص</label>
          <textarea
            {...register('summary')}
            className="w-full p-2 bg-gray-700 text-white"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-gold text-black px-4 py-2 rounded flex items-center"
        >
          <FaSave className="mr-2" />
          حفظ التغييرات
        </button>
      </form>

      <h2 className="text-2xl mb-4">الشهادات</h2>
      <button
        onClick={addTestimonial}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        إضافة شهادة جديدة
      </button>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl">{testimonial.name}</h3>
            <p className="text-gray-300">{testimonial.position || 'عميل'}</p>
            <p>{testimonial.feedback}</p>
            <div className="mt-2">
              <button
                onClick={() => editTestimonial(testimonial)}
                className="bg-yellow-600 px-3 py-1 rounded mr-2"
              >
                تعديل
              </button>
              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTestimonial && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl mb-4">
            {editingTestimonial.id ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="الاسم"
              value={editingTestimonial.name}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  name: e.target.value,
                })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <input
              placeholder="المنصب"
              value={editingTestimonial.position || ''}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  position: e.target.value,
                })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <textarea
              placeholder="المحتوى"
              value={editingTestimonial.feedback}
              onChange={(e) =>
                setEditingTestimonial({
                  ...editingTestimonial,
                  feedback: e.target.value,
                })
              }
              className="p-2 bg-gray-700 text-white col-span-2"
              rows="4"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={saveTestimonial}
              className="bg-green-600 px-4 py-2 rounded mr-2"
            >
              حفظ
            </button>
            <button
              onClick={() => setEditingTestimonial(null)}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
