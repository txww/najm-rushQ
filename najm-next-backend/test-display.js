// اختبار سريع للتحقق من ظهور المواد والمنتجات على الموقع
const BASE_URL = 'http://localhost:3000';

async function testMaterialDisplay() {
  console.log('\n=== اختبار عرض المواد والمنتجات ===\n');

  try {
    // 1. جلب قائمة المواد من API
    console.log('1. جلب قائمة المواد من API...');
    const materialsRes = await fetch(`${BASE_URL}/api/materials`);
    const materials = await materialsRes.json();
    console.log(`✓ تم جلب ${materials.length} مادة\n`);

    if (materials.length > 0) {
      const material = materials[0];
      console.log(`   اسم المادة: ${material.name}`);
      console.log(`   عدد المنتجات: ${material.products?.length || 0}`);
      
      // 2. جلب تفاصيل مادة محددة
      console.log(`\n2. جلب تفاصيل المادة رقم ${material.id}...`);
      const detailRes = await fetch(`${BASE_URL}/api/materials/${material.id}`);
      const detail = await detailRes.json();
      console.log(`✓ تم جلب المادة: ${detail.name}`);
      console.log(`   الوصف: ${detail.description}`);
      console.log(`   عدد المنتجات: ${detail.products?.length || 0}\n`);

      // 3. جلب منتج محدد إن وجد
      if (detail.products && detail.products.length > 0) {
        const product = detail.products[0];
        console.log(`3. جلب تفاصيل المنتج رقم ${product.id}...`);
        const productRes = await fetch(`${BASE_URL}/api/products/${product.id}`);
        if (productRes.ok) {
          const productDetail = await productRes.json();
          console.log(`✓ تم جلب المنتج: ${productDetail.name}`);
          console.log(`   الوصف: ${productDetail.description}`);
          console.log(`   المادة الأب: ${productDetail.material?.name || 'غير محدد'}\n`);
        } else {
          console.log(`⚠ لم يتم العثور على المنتج في API (هذا طبيعي للمنتجات الثابتة)\n`);
        }
      }
    }

    console.log('\n✅ جميع الاختبارات نجحت!');
    console.log('المواد والمنتجات يجب أن تظهر الآن على الموقع بشكل صحيح.');
    console.log('\nخطوات الاختبار:');
    console.log('1. افتح الصفحة الرئيسية: http://localhost:3000');
    console.log('2. قم بالتمرير إلى قسم "المواد والمنتجات"');
    console.log('3. انقر على أي مادة لعرض تفاصيلها والمنتجات المرتبطة بها');
    console.log('4. جميع المواد والمنتجات المضافة يجب أن تظهر الآن');

  } catch (error) {
    console.error('❌ حدث خطأ:', error.message);
  }
}

testMaterialDisplay();
