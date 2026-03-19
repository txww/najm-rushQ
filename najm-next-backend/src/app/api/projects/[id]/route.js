import { getProject, strapiDelete, strapiUpdate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const project = await getProject(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project from Strapi:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project from Strapi' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const { title, location, year, summary, area, floors, status, client, mapLocation, features, image } = body;
    const updateData = {
      title, location, summary, area, status, client, mapLocation,
      year: parseInt(year),
      floors: parseInt(floors),
      features: Array.isArray(features) ? features.join(',') : features,
    };
    if (image) updateData.image = image;
    const project = await strapiUpdate('projects', id, updateData);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project in Strapi:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const result = await strapiDelete('projects', id);
    if (result === null) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
