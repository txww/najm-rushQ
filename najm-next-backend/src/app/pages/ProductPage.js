import { useParams, useNavigate } from 'react-router-dom';
import { materials } from '../data/materials';

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const pid = productId;
  let product = null;

  for (const m of materials) {
    const found = m.products.find((p) => p.id === pid);
    if (found) {
      product = found;
      break;
    }
  }

  if (!product)
    return (
      <h2 className="text-center mt-20 text-3xl font-bold text-[var(--brand-gold,#C28A17)]">
        المنتج غير موجود
      </h2>
    );

  return (
    <div className="container mx-auto px-6 py-16">
      {' '}
      {/* زيادة المسافة العلوية لتخفيض الصفحة */}
      <article className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col transition hover:shadow-2xl mt-40">
        {/* زر الرجوع فوق الصورة */}
        <div className="p-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            ← رجوع
          </button>
        </div>

        {/* صورة المنتج الكبيرة والواضحة */}
        <div className="w-full h-[500px] bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* محتوى المنتج */}
        <div className="p-8 flex flex-col gap-6 text-gray-800 dark:text-gray-200">
          <h1 className="text-3xl font-extrabold text-[var(--brand-gold,#C28A17)]">
            {product.name}
          </h1>

          <p className="text-base">{product.description}</p>

          {/* نوع المنتج */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--brand-gold,#C28A17)] mb-2">
              نوع المنتج
            </h2>
            <p className="text-base">{product.type || 'غير محدد'}</p>
          </div>

          {/* تفاصيل أخرى */}
          <div>
            <h2 className="text-xl font-semibold text-[var(--brand-gold,#C28A17)] mb-2">
              تفاصيل أخرى
            </h2>
            <ul className="list-disc list-inside text-base space-y-1">
              <li>
                <strong>الخصائص:</strong> {product.properties || 'غير محدد'}
              </li>
              <li>
                <strong>الاستخدامات:</strong> {product.usage || 'غير محدد'}
              </li>
              <li>
                <strong>المواصفات الفنية:</strong>{' '}
                {product.specifications || 'غير محدد'}
              </li>
              <li>
                <strong>معلومات إضافية:</strong>{' '}
                {product.additionalInfo || 'غير محدد'}
              </li>
            </ul>
          </div>

          {/* أزرار التفاعل */}
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER || '+963984966818'}?text=${encodeURIComponent(`أريد تفاصيل عن ${product.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold shadow-md hover:brightness-105 transition"
            >
              اطلب عبر واتساب
            </a>

            <a
              href="/contact"
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              تواصل عبر البريد
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
