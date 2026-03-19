'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function EditProduct({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return product ? product.image : '';
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.imageUrl;
  };

  useEffect(() => {
    if (localStorage.getItem('admin') !== 'true') {
      router.push('/admin');
    } else {
      fetchProduct();
    }
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${id}`);
    if (res.ok) {
      const data = await res.json();
      setProduct(data);
      setValue('name', data.name);
      setValue('image', data.image);
      setValue('description', data.description);
      setValue('type', data.type);
      setValue('properties', data.properties);
      setValue('usage', data.usage);
      setValue('specifications', data.specifications);
      setValue('additionalInfo', data.additionalInfo);
    } else {
      alert('فشل في جلب المنتج: ' + res.status);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!data.name.trim()) {
        alert('يرجى إدخال اسم المنتج');
        return;
      }

      const imageUrl = await uploadFile();
      const body = { ...data, image: imageUrl };
      
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      if (res.ok) {
        alert('تم حفظ المنتج بنجاح!');
        router.push('/admin/materials');
      } else {
        const error = await res.json();
        alert('خطأ في الحفظ: ' + (error.error || res.status));
      }
    } catch (e) {
      console.error('Error:', e);
      alert('خطأ في الحفظ: ' + e.message);
    }
  };

  if (!product) return <div className="text-center mt-20">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl mb-8">تعديل المنتج</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto"
      >
        <div className="mb-4">
          <label className="block mb-2">الاسم</label>
          <input
            {...register('name')}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">الصورة</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
          {product.image && (
            <p className="text-sm text-gray-400 mt-1">
              الصورة الحالية: {product.image}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">الوصف</label>
          <textarea
            {...register('description')}
            className="w-full p-2 bg-gray-700 text-white rounded"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">النوع</label>
          <input
            {...register('type')}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">الخصائص</label>
          <textarea
            {...register('properties')}
            className="w-full p-2 bg-gray-700 text-white rounded"
            rows="2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">الاستخدام</label>
          <input
            {...register('usage')}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">المواصفات</label>
          <textarea
            {...register('specifications')}
            className="w-full p-2 bg-gray-700 text-white rounded"
            rows="2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">معلومات إضافية</label>
          <textarea
            {...register('additionalInfo')}
            className="w-full p-2 bg-gray-700 text-white rounded"
            rows="2"
          />
        </div>
        <button
          type="submit"
          className="bg-gold text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
        >
          حفظ المنتج
        </button>
      </form>
    </div>
  );
}
