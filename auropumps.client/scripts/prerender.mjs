import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { publicRoutes } from '../src/seo/publicRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('[Prerender Error] dist/ directory does not exist. Run "vite build" first.');
  process.exit(1);
}

// 1. Create spa-shell.html from initial dist/index.html
const indexHtmlPath = path.join(distDir, 'index.html');
const spaShellPath = path.join(distDir, 'spa-shell.html');

let originalIndexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Ensure root is empty in spa-shell.html and loader is removed for clean fallback
let cleanShellHtml = originalIndexHtml.replace(
  /<div id="root">[\s\S]*?<\/div>/i,
  '<div id="root"></div>'
);
fs.writeFileSync(spaShellPath, cleanShellHtml, 'utf8');
console.log('[Prerender] Created dist/spa-shell.html with empty #root');

// 2. Simple static server for serving dist/ files during capture
const PORT = 4173;
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA fallback for routing capture
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(originalIndexHtml);
});

await new Promise(resolve => server.listen(PORT, resolve));
console.log(`[Prerender] Local server running at http://localhost:${PORT}`);

try {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const route of publicRoutes) {
    if (!route.prerender) continue;

    console.log(`[Prerender] Capturing route: ${route.path}...`);
    const page = await context.newPage();

    try {
      await page.goto(`http://localhost:${PORT}${route.path}`, {
        waitUntil: 'networkidle',
        timeout: 15000
      });

      // App.jsx has a loader timer of 2750ms. Wait 3500ms for loader to unmount and route to render.
      await page.waitForTimeout(3500);

      // Remove loader element if present, and set route metadata cleanly
      await page.evaluate((r) => {
        // Remove app loader overlay from captured HTML
        const loader = document.querySelector('.app-loader');
        if (loader) loader.remove();

        // 1. Remove all existing <title> tags to prevent duplicate title tags
        document.querySelectorAll('title').forEach(t => t.remove());

        // 2. Insert single clean <title> tag
        if (r.title) {
          const titleEl = document.createElement('title');
          titleEl.textContent = r.title;
          document.head.insertBefore(titleEl, document.head.firstChild);
        }

        const setMeta = (name, content) => {
          if (!content) return;
          let el = document.querySelector(`meta[name="${name}"]`);
          if (!el) {
            el = document.createElement('meta');
            el.setAttribute('name', name);
            document.head.appendChild(el);
          }
          el.setAttribute('content', content);
        };

        const setPropertyMeta = (property, content) => {
          if (!content) return;
          let el = document.querySelector(`meta[property="${property}"]`);
          if (!el) {
            el = document.createElement('meta');
            el.setAttribute('property', property);
            document.head.appendChild(el);
          }
          el.setAttribute('content', content);
        };

        setMeta('description', r.description);
        setMeta('keywords', r.keywords);

        // Canonical
        let canonicalEl = document.querySelector('link[rel="canonical"]');
        if (!canonicalEl) {
          canonicalEl = document.createElement('link');
          canonicalEl.setAttribute('rel', 'canonical');
          document.head.appendChild(canonicalEl);
        }
        canonicalEl.setAttribute('href', r.canonical);

        // OpenGraph
        setPropertyMeta('og:title', r.title);
        setPropertyMeta('og:description', r.description);
        setPropertyMeta('og:url', r.canonical);
        setPropertyMeta('og:type', 'website');

        // Twitter
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', r.title);
        setMeta('twitter:description', r.description);
      }, route);

      let html = await page.content();

      // Ensure no trailing duplicate titles remained
      html = html.replace(/(<title[^>]*>[\s\S]*?<\/title>)[\s\S]*?<title[^>]*>[\s\S]*?<\/title>/gi, '$1');

      // Determine save path
      let savePath;
      if (route.path === '/') {
        savePath = path.join(distDir, 'index.html');
      } else {
        const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        savePath = path.join(routeDir, 'index.html');
      }

      fs.writeFileSync(savePath, html, 'utf8');
      console.log(`[Prerender Success] Saved ${path.relative(distDir, savePath)}`);
    } catch (err) {
      console.error(`[Prerender Failed] Could not capture ${route.path}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
} finally {
  server.close();
  console.log('[Prerender] Server closed. Prerendering complete.');
}
