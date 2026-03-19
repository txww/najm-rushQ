import { getMaterial, strapiDelete, strapiUpdate, getDocumentId, fetchStrapi } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const material = await getMaterial(id);
    if (!material) {
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch material from Strapi' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const { name, description, image, products } = body;

    const updateData = { name, description };
    if (image) updateData.image = image;

    // Update the material's own fields in Strapi
    const material = await strapiUpdate('materials', id, updateData);
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    // Update each product individually (Strapi v5 doesn't support nested creates via PUT)
    if (products?.length) {
      const documentId = await getDocumentId('materials', id);
      for (const p of products) {
        const { materialId, id: productId, documentId: productDocId, ...fields } = p;
        if (productDocId || (productId && isNaN(Number(productId)) === false && productId)) {
          // Existing product — update it
          const pid = productDocId || productId;
          await strapiUpdate('products', pid, { ...fields, material: documentId });
        } else {
          // New product — create it
          await fetchStrapi('products', {
            method: 'POST',
            body: JSON.stringify({ data: { ...fields, material: documentId } }),
          });
        }
      }
    }

    const updated = await getMaterial(id);
    return NextResponse.json(updated ?? material);
  } catch (error) {
    console.error('Error updating material in Strapi:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const result = await strapiDelete('materials', id);
    if (result === null) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Material deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete material' },
      { status: 500 }
    );
  }
}
