import { getProducts, strapiCreate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name, description, type, properties, usage,
      specifications, additionalInfo, image, materialId,
    } = body;

    const data = { name, description, type, properties, usage, specifications, additionalInfo };
    if (image) data.image = image;
    // materialId here should be the Strapi documentId of the parent material
    if (materialId) data.material = materialId;

    const product = await strapiCreate('products', data);
    if (!product) {
      return NextResponse.json(
        { error: 'Failed to create product in Strapi' },
        { status: 500 }
      );
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product: ' + error.message },
      { status: 500 }
    );
  }
}
