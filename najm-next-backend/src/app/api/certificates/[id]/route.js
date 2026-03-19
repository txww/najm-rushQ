import { strapiDelete, strapiUpdate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { id: _id, documentId: _doc, createdAt: _c, updatedAt: _u, publishedAt: _p, ...data } = await request.json();
    const certificate = await strapiUpdate('certificates', id, data);
    if (!certificate) return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await strapiDelete('certificates', id);
    if (result === null) return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
