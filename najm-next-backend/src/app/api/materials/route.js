import { getMaterials, getMaterial, strapiCreate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const materials = await getMaterials();
    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch materials from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, image, products } = body;

    const data = { name, description };
    if (image) data.image = image;

    const material = await strapiCreate('materials', data);
    if (!material) {
      return NextResponse.json(
        { error: 'Failed to create material in Strapi' },
        { status: 500 }
      );
    }

    // Create associated products individually (Strapi v5 doesn't support nested creates)
    if (products?.length) {
      for (const p of products) {
        const {
          id: _id, materialId: _mid, documentId: _doc,
          createdAt: _c, updatedAt: _u, publishedAt: _pa,
          ...productFields
        } = p;
        await strapiCreate('products', {
          ...productFields,
          material: material.documentId,
        });
      }
    }

    // Re-fetch with products populated
    const full = await getMaterial(material.documentId);
    return NextResponse.json(full ?? material, { status: 201 });
  } catch (error) {
    console.error('Error creating material:', error);
    return NextResponse.json(
      { error: 'Failed to create material: ' + error.message },
      { status: 500 }
    );
  }
}
