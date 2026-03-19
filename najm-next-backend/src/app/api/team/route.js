import { getTeamMembers, strapiCreate } from '@/lib/strapi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const team = await getTeamMembers();
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch team from Strapi' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, position, bio, phone, email, image } = body;

    const data = { name, position, bio, phone, email };
    if (image) data.image = image;

    const member = await strapiCreate('team-members', data);
    if (!member) {
      return NextResponse.json(
        { error: 'Failed to create team member in Strapi' },
        { status: 500 }
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create team member: ' + error.message },
      { status: 500 }
    );
  }
}
