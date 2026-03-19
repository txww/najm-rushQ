import { strapiDelete, strapiUpdate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { id: _id, documentId: _doc, createdAt: _c, updatedAt: _u, publishedAt: _p, ...data } = await request.json();
    const customer = await strapiUpdate('customers', id, data);
    if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await strapiDelete('customers', id);
    if (result === null) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
