import { getServices, strapiCreate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

// GET - جلب جميع الخدمات
export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services from Strapi' },
      { status: 500 }
    );
  }
}

// POST - إضافة خدمة جديدة
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, icon } = body;

    const service = await strapiCreate('services', { title, description, icon });
    if (!service) {
      return NextResponse.json(
        { error: 'Failed to create service in Strapi' },
        { status: 500 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create service: ' + error.message },
      { status: 500 }
    );
  }
}
