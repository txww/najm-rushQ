'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function EditMaterial({ params }) {
  const { id } = params;
  const [material, setMaterial] = useState(null);
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return { url: material ? material.image : '', fileId: null };
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return { url: data.imageUrl, fileId: data.fileId };
  };

  useEffect(() => {
    if (localStorage.getItem('admin') !== 'true') {
      router.push('/admin');
    } else {
      fetchMaterial();
    }
  }, []);

  const fetchMaterial = async () => {
    const res = await fetch(`/api/materials/${id}`);
    if (res.ok) {
      const data = await res.json();
      setMaterial(data);
      setProducts(data.products || []);
      setValue('name', data.name);
      setValue('image', data.image);
      setValue('description', data.description);
    } else {
      alert('فشل في جلب البيانات: ' + res.status);
    }
  };

  const addProduct = () => {
    setEditingProduct({
      id: Date.now().toString(),
      name: '',
      image: '',
      description: '',
      type: '',
      properties: '',
      usage: '',
      specifications: '',
      additionalInfo: '',
    });
  };

  const editProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const saveProduct = () => {
    if (editingProduct.id && products.find((p) => p.id === editingProduct.id)) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
    } else {
      setProducts([...products, editingProduct]);
    }
    setEditingProduct(null);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const onSubmit = async (data) => {
    console.log('Submitting', data);
    try {
      if (!data.name.trim()) {
        alert('يرجى إدخال اسم المادة');
        return;
      }

      const { url: imageUrl, fileId: imageFileId } = await uploadFile();
      const body = {
        ...data,
        image: imageUrl,
        ...(imageFileId && { imageFileId }),
        products: products,
      };
      console.log('Body', body);
      
      const res = await fetch(`/api/materials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      console.log('Response status', res.status);
      
      if (res.ok) {
        alert('تم حفظ المادة بنجاح!');
        router.push('/admin/materials');
      } else {
        const error = await res.json();
        alert('خطأ في الحفظ: ' + (error.error || res.status));
      }
    } catch (e) {
      console.error('Error', e);
      alert('خطأ في الحفظ: ' + e.message);
    }
  };

  if (!material) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl mb-8">تعديل المادة</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-lg mb-8"
      >
        <div className="mb-4">
          <label className="block mb-2">الاسم</label>
          <input
            {...register('name')}
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
          {material && material.image && (
            <p className="text-sm text-gray-400">
              الصورة الحالية: {material.image}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">الوصف</label>
          <textarea
            {...register('description')}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <button type="submit" className="bg-gold text-black px-4 py-2 rounded">
          حفظ المادة
        </button>
      </form>

      <h2 className="text-2xl mb-4">المنتجات</h2>
      <button
        onClick={addProduct}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        إضافة منتج جديد
      </button>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {products.map((prod) => (
          <div key={prod.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl">{prod.name}</h3>
            <p>{prod.description}</p>
            <div className="mt-2">
              <button
                onClick={() => editProduct(prod)}
                className="bg-yellow-600 px-3 py-1 rounded mr-2"
              >
                تعديل
              </button>
              <Link
                href={`/admin/products/${prod.id}`}
                className="bg-blue-600 px-3 py-1 rounded mr-2 inline-block"
              >
                تعديل مفصل
              </Link>
              <button
                onClick={() => deleteProduct(prod.id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl mb-4">
            {editingProduct.id ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="الاسم"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <input
              placeholder="الصورة"
              value={editingProduct.image}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, image: e.target.value })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <textarea
              placeholder="الوصف"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
              className="p-2 bg-gray-700 text-white col-span-2"
            />
            <input
              placeholder="النوع"
              value={editingProduct.type}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, type: e.target.value })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <textarea
              placeholder="الخصائص"
              value={editingProduct.properties}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  properties: e.target.value,
                })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <input
              placeholder="الاستخدام"
              value={editingProduct.usage}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, usage: e.target.value })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <textarea
              placeholder="المواصفات"
              value={editingProduct.specifications}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  specifications: e.target.value,
                })
              }
              className="p-2 bg-gray-700 text-white"
            />
            <textarea
              placeholder="معلومات إضافية"
              value={editingProduct.additionalInfo}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  additionalInfo: e.target.value,
                })
              }
              className="p-2 bg-gray-700 text-white col-span-2"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={saveProduct}
              className="bg-green-600 px-4 py-2 rounded mr-2"
            >
              حفظ
            </button>
            <button
              onClick={() => setEditingProduct(null)}
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
