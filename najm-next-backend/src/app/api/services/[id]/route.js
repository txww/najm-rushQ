import { strapiDelete, strapiUpdate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

// PUT - تحديث خدمة
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, icon } = body;
    const service = await strapiUpdate('services', id, { title, description, icon });
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE - حذف خدمة
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await strapiDelete('services', id);
    if (result === null) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
