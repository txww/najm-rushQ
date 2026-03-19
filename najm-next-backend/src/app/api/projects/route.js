import { getProjects, strapiCreate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title, location, year, summary, area, floors,
      status, client, mapLocation, features, image,
    } = body;

    const data = {
      title, location, summary, area, status, client, mapLocation,
      year: year ? parseInt(year) : undefined,
      floors: floors ? parseInt(floors) : undefined,
      features: Array.isArray(features) ? features.join(',') : (features || ''),
    };
    if (image) data.image = image;

    const project = await strapiCreate('projects', data);
    if (!project) {
      return NextResponse.json(
        { error: 'Failed to create project in Strapi' },
        { status: 500 }
      );
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project: ' + error.message },
      { status: 500 }
    );
  }
}
