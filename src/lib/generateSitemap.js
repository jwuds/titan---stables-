
import { getCanonicalUrl } from '@/lib/canonicalUrl';

const BASE_URL = 'https://titanstables.org';

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/horses', priority: 0.9, changefreq: 'daily' },
  { path: '/store', priority: 0.8, changefreq: 'weekly' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/services', priority: 0.7, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/facility', priority: 0.7, changefreq: 'monthly' },
  { path: '/reviews', priority: 0.7, changefreq: 'weekly' },
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },
  { path: '/policies', priority: 0.5, changefreq: 'yearly' },
  { path: '/locations', priority: 0.7, changefreq: 'monthly' },
  { path: '/gallery', priority: 0.6, changefreq: 'monthly' },
  { path: '/testimonials', priority: 0.7, changefreq: 'weekly' },
  { path: '/sitemap', priority: 0.4, changefreq: 'monthly' },
  // Education
  { path: '/breed-history', priority: 0.6, changefreq: 'monthly' },
  { path: '/friesian-pricing', priority: 0.6, changefreq: 'monthly' },
  { path: '/care-training', priority: 0.6, changefreq: 'monthly' },
];

/**
 * CRITICAL: Admin route patterns to exclude from sitemap
 */
const ADMIN_ROUTE_PATTERNS = [
  '/admin',
  '/admin/',
  '/admin-login',
  '/login',
  '/admin/dashboard',
  '/admin/blog',
  '/admin/horses',
  '/admin/settings',
  '/admin/faqs',
];

/**
 * Checks if a path is an admin route
 */
const isAdminRoute = (path) => {
  return ADMIN_ROUTE_PATTERNS.some(pattern => 
    path === pattern || path.startsWith('/admin/')
  );
};

/**
 * Filters out admin routes from URL list
 */
const filterPublicRoutes = (routes) => {
  return routes.filter(route => !isAdminRoute(route.path));
};

/**
 * Generates a sitemap XML string.
 * CRITICAL: Excludes all admin routes from sitemap generation.
 * Note: In a real build pipeline, this would fetch dynamic IDs (horses, products, posts).
 * For this client-side utility, we generate the structure.
 */
export function generateSitemapXml(dynamicUrls = []) {
  const date = new Date().toISOString();

  const createUrlEntry = (url, priority, changefreq) => {
    const canonical = getCanonicalUrl(url); // Ensure strict canonical format
    return `
  <url>
    <loc>${canonical}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
  };

  // CRITICAL: Filter out admin routes from static routes
  const publicStaticRoutes = filterPublicRoutes(STATIC_ROUTES);
  
  const staticEntries = publicStaticRoutes.map(route => 
    createUrlEntry(route.path, route.priority, route.changefreq)
  ).join('');

  // CRITICAL: Filter out admin routes from dynamic URLs
  const publicDynamicUrls = filterPublicRoutes(dynamicUrls);
  
  const dynamicEntries = publicDynamicUrls.map(item => 
    createUrlEntry(item.path, item.priority || 0.6, item.changefreq || 'weekly')
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${dynamicEntries}
</urlset>`;
}
