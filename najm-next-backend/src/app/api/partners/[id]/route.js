import { strapiDelete, strapiUpdate } from '@/lib/strapi';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { id: _id, documentId: _doc, createdAt: _c, updatedAt: _u, publishedAt: _p, ...data } = await request.json();
    const partner = await strapiUpdate('partners', id, data);
    if (!partner) return Response.json({ error: 'Partner not found' }, { status: 404 });
    return Response.json(partner);
  } catch (error) {
    console.error('Error updating partner:', error);
    return Response.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await strapiDelete('partners', id);
    if (result === null) return Response.json({ error: 'Partner not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return Response.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
