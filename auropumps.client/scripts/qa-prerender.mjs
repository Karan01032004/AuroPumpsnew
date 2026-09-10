import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { publicRoutes } from '../src/seo/publicRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

console.log('[QA Prerender] Starting validation of generated dist HTML files...');

let hasError = false;

const decodeEntities = (str) => {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

// 1. Verify spa-shell.html
const spaShellPath = path.join(distDir, 'spa-shell.html');
if (!fs.existsSync(spaShellPath)) {
  console.error('❌ FAIL: dist/spa-shell.html missing!');
  hasError = true;
} else {
  const shellHtml = fs.readFileSync(spaShellPath, 'utf8');
  if (shellHtml.includes('<div id="root"></div>') || shellHtml.includes('<div id="root"> </div>')) {
    console.log('✅ PASS: dist/spa-shell.html exists and has empty #root');
  } else {
    console.error('❌ FAIL: dist/spa-shell.html #root is NOT empty!');
    hasError = true;
  }
}

// 2. Verify all prerendered public routes
for (const route of publicRoutes) {
  if (!route.prerender) continue;

  const targetPath = route.path === '/' 
    ? path.join(distDir, 'index.html') 
    : path.join(distDir, route.path.replace(/^\//, ''), 'index.html');

  if (!fs.existsSync(targetPath)) {
    console.error(`❌ FAIL: Prerendered file missing for ${route.path} -> ${path.relative(distDir, targetPath)}`);
    hasError = true;
    continue;
  }

  const html = fs.readFileSync(targetPath, 'utf8');

  // Check Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : '';
  const expectedTitle = decodeEntities(route.title);
  if (!title || title !== expectedTitle) {
    console.error(`❌ FAIL: Title mismatch for ${route.path}. Expected "${expectedTitle}", found "${title}"`);
    hasError = true;
  }

  // Check Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
  if (!canonical || canonical !== route.canonical) {
    console.error(`❌ FAIL: Canonical mismatch for ${route.path}. Expected "${route.canonical}", found "${canonical}"`);
    hasError = true;
  }

  // Check Body Content in #root (must NOT be empty shell)
  const isRootEmpty = html.includes('<div id="root"></div>') || html.includes('<div id="root"> </div>');
  const rootIndex = html.indexOf('<div id="root">');
  const bodyAfterRoot = rootIndex !== -1 ? html.substring(rootIndex) : '';
  const textContent = bodyAfterRoot.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  if (isRootEmpty || textContent.length < 50) {
    console.error(`❌ FAIL: #root body content empty or missing for ${route.path} (length: ${textContent.length})`);
    hasError = true;
  } else {
    console.log(`✅ PASS: ${route.path} -> Title & Canonical match, #root text length: ${textContent.length} chars`);
  }
}

if (hasError) {
  console.error('\n❌ Prerender QA Failed! Please check errors above.');
  process.exit(1);
} else {
  console.log('\n🎉 All Prerender QA Checks PASSED Successfully!');
}
