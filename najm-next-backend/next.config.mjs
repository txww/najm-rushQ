/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,

  images: {
    remotePatterns: [
      // Local dev - Strapi uploads
      { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '1337', pathname: '/uploads/**' },
      // Production - Strapi CMS subdomain
      { protocol: 'https', hostname: 'cms.najmrush.com', pathname: '/uploads/**' },
      // Production - main domain uploads (local storage)
      { protocol: 'https', hostname: 'najmrush.com', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'www.najmrush.com', pathname: '/uploads/**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        // Cache uploaded images
        source: '/uploads/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  env: {
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
