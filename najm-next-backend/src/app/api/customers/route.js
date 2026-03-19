import { getCustomers, strapiCreate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = await getCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customers from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, position, company, rating, text, project, image } = body;

    const data = {
      name, position, company, text, project,
      rating: rating ? parseInt(rating) : 5,
    };
    if (image) data.image = image;

    const customer = await strapiCreate('customers', data);
    if (!customer) {
      return NextResponse.json(
        { error: 'Failed to create customer in Strapi' },
        { status: 500 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create customer: ' + error.message },
      { status: 500 }
    );
  }
}
