import { strapiDelete, strapiUpdate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { id: _id, documentId: _doc, createdAt: _c, updatedAt: _u, publishedAt: _p, ...data } = await request.json();
    const member = await strapiUpdate('team-members', id, data);
    if (!member) return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await strapiDelete('team-members', id);
    if (result === null) return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
