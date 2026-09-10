import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { publicRoutes } from '../src/seo/publicRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 1. Export seo-routes.json
const jsonOutput = JSON.stringify(publicRoutes, null, 2);

const targets = [
  path.join(projectRoot, 'src', 'seo', 'seo-routes.json'),
  path.join(projectRoot, 'public', 'seo-routes.json'),
];

targets.forEach(targetPath => {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(targetPath, jsonOutput, 'utf8');
  console.log(`[SEO Catalog] Exported to ${path.relative(projectRoot, targetPath)}`);
});

// Also write to dist/ if dist exists
const distPath = path.join(projectRoot, 'dist', 'seo-routes.json');
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, jsonOutput, 'utf8');
  console.log(`[SEO Catalog] Exported to dist/seo-routes.json`);
}

// 2. Generate sitemap.xml
const sitemapRoutes = publicRoutes.filter(r => r.sitemap);
const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

sitemapRoutes.forEach(r => {
  const loc = r.canonical || `https://auropumps.com${r.path}`;
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${loc}</loc>\n`;
  sitemapXml += `    <lastmod>${today}</lastmod>\n`;
  sitemapXml += `    <changefreq>${r.path === '/' ? 'weekly' : 'monthly'}</changefreq>\n`;
  sitemapXml += `    <priority>${r.path === '/' ? '1.0' : '0.8'}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>\n`;

const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`[Sitemap] Generated public/sitemap.xml with ${sitemapRoutes.length} URLs`);
