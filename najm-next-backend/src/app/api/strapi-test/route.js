import { NextResponse } from 'next/server';
import {
  getMaterials,
  getProducts,
  getProjects,
  getServices,
  getCertificates,
  getTeamMembers,
  getPartners,
  getCustomers,
  getSiteSettings,
  strapiHealth,
} from '@/lib/strapi';

export async function GET() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const hasToken = !!process.env.STRAPI_API_TOKEN;

  const healthy = await strapiHealth();

  if (!healthy) {
    return NextResponse.json(
      {
        ok: false,
        strapiUrl,
        hasToken,
        error: 'Strapi is not reachable. Make sure it is running at ' + strapiUrl,
      },
      { status: 503 }
    );
  }

  // Fetch all content types in parallel
  const [materials, products, projects, services, certificates, team, partners, customers, settings] =
    await Promise.all([
      getMaterials(),
      getProducts(),
      getProjects(),
      getServices(),
      getCertificates(),
      getTeamMembers(),
      getPartners(),
      getCustomers(),
      getSiteSettings(),
    ]);

  return NextResponse.json({
    ok: true,
    strapiUrl,
    hasToken,
    counts: {
      materials: materials?.length ?? 0,
      products: products?.length ?? 0,
      projects: projects?.length ?? 0,
      services: services?.length ?? 0,
      certificates: certificates?.length ?? 0,
      teamMembers: team?.length ?? 0,
      partners: partners?.length ?? 0,
      customers: customers?.length ?? 0,
      siteSettings: Object.keys(settings ?? {}).length,
    },
  });
}
