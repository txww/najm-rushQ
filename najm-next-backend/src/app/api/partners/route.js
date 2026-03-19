import { getPartners, strapiCreate } from '@/lib/strapi';

export async function GET() {
  try {
    const partners = await getPartners();
    return Response.json(partners);
  } catch (error) {
    console.error('Error fetching partners from Strapi:', error);
    return Response.json(
      { error: 'Failed to fetch partners from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, website, image, logo } = body;

    const data = { name, website };
    // Partners use 'logo' as the image field name
    if (logo) data.logo = logo;
    else if (image) data.logo = image;

    const partner = await strapiCreate('partners', data);
    if (!partner) {
      return Response.json(
        { error: 'Failed to create partner in Strapi' },
        { status: 500 }
      );
    }

    return Response.json(partner);
  } catch (error) {
    console.error('Error creating partner:', error);
    return Response.json(
      { error: 'Failed to create partner: ' + error.message },
      { status: 500 }
    );
  }
}
