import { getCertificates, strapiCreate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const certificates = await getCertificates();
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch certificates from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, organization, year, image } = body;

    const data = {
      title,
      organization,
      year: year ? parseInt(year) : undefined,
    };
    if (image) data.image = image;

    const certificate = await strapiCreate('certificates', data);
    if (!certificate) {
      return NextResponse.json(
        { error: 'Failed to create certificate in Strapi' },
        { status: 500 }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create certificate: ' + error.message },
      { status: 500 }
    );
  }
}
