import { getSiteSettings, strapiCreate, strapiUpdate, fetchStrapi } from '@/lib/strapi';
import { NextResponse } from 'next/server';

// GET - جلب جميع الإعدادات
export async function GET() {
  try {
    const settingsObject = await getSiteSettings();
    return NextResponse.json(settingsObject);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings from Strapi' },
      { status: 500 }
    );
  }
}

// POST - إنشاء أو تحديث إعداد (upsert by key)
export async function POST(request) {
  try {
    const body = await request.json();
    const { key, value, description, category } = body;

    // Look up existing setting by key
    const existing = await fetchStrapi(
      `site-settings?filters[key][$eq]=${encodeURIComponent(key)}&fields[0]=documentId`
    );

    let setting;
    if (existing && existing.length > 0) {
      setting = await strapiUpdate('site-settings', existing[0].documentId, {
        value, description, category,
      });
    } else {
      setting = await strapiCreate('site-settings', { key, value, description, category });
    }

    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save setting: ' + error.message },
      { status: 500 }
    );
  }
}

// PUT - تحديث قيمة إعداد محدد بالمفتاح
export async function PUT(request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    const existing = await fetchStrapi(
      `site-settings?filters[key][$eq]=${encodeURIComponent(key)}&fields[0]=documentId`
    );

    if (!existing || existing.length === 0) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
    }

    const setting = await strapiUpdate('site-settings', existing[0].documentId, { value });
    return NextResponse.json(setting);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update setting: ' + error.message },
      { status: 500 }
    );
  }
}
