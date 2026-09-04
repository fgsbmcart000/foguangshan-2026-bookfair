const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const esbuild = require(require.resolve('esbuild', { paths: [path.dirname(require.resolve('wrangler/package.json'))] }));
const destination = process.argv[2];
if (!destination) throw new Error('Usage: node scripts/export-static.cjs ABSOLUTE_OUTPUT_DIRECTORY');
const out = path.resolve(destination);
if (out === root || !path.isAbsolute(destination)) throw new Error('Use a separate absolute output directory.');
const scratch = path.join(root, 'work', 'static-export');
fs.mkdirSync(scratch, { recursive: true });
fs.mkdirSync(out, { recursive: true });
let page = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8').replace(/\r\n/g, '\n');
const excluded = ['schedule', 'online', 'booths', 'visitor-tools'];
for (const id of excluded) {
  const start = page.indexOf(`        <section className="section ${id === 'online' ? 'online' : id === 'booths' ? 'booth' : id === 'visitor-tools' ? 'visitor-tools' : 'schedule'}-section" id="${id}">`);
  if (start < 0) throw new Error(`Missing expected section: ${id}`);
  const end = page.indexOf('        <section className="section ', start + 1);
  if (end < 0) throw new Error(`Missing following section: ${id}`);
  page = page.slice(0, start) + page.slice(end);
  page = page.replace(new RegExp(`^  \\["[^"\\n]+", "${id}"\\],\\n`, 'm'), '');
}
page = page.replace(/^\s*<a href="#schedule">查看每日活動表<\/a>\n/m, '\n');
page = page.replace(/(["'`])\/assets\//g, '$1./assets/');
fs.writeFileSync(path.join(scratch, 'page.tsx'), page);
const pageImport = JSON.stringify(path.join(scratch, 'page.tsx'));
fs.writeFileSync(path.join(scratch, 'browser.tsx'), `import React from 'react'; import {hydrateRoot} from 'react-dom/client'; import Page from ${pageImport}; hydrateRoot(document.getElementById('app')!, <Page />);`);
fs.writeFileSync(path.join(scratch, 'render.tsx'), `import React from 'react'; import {renderToString} from 'react-dom/server'; import Page from ${pageImport}; import {metadata} from ${JSON.stringify(path.join(root, 'app/layout.tsx'))}; export const html=renderToString(<Page />); export {metadata};`);
const common = { bundle: true, absWorkingDir: root, nodePaths: [path.join(root, 'node_modules')], define: { 'process.env.NODE_ENV': '"production"' }, logLevel: 'warning' };
esbuild.buildSync({ ...common, entryPoints: [path.join(scratch, 'browser.tsx')], platform: 'browser', format: 'iife', target: ['es2020'], minify: true, outfile: path.join(out, 'site.js') });
esbuild.buildSync({ ...common, entryPoints: [path.join(scratch, 'render.tsx')], platform: 'node', format: 'cjs', loader: { '.css': 'empty' }, outfile: path.join(scratch, 'render.cjs') });
const rendered = require(path.join(scratch, 'render.cjs'));
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const html = `<!doctype html>\n<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(rendered.metadata.title)}</title><meta name="description" content="${escape(rendered.metadata.description)}"><meta name="robots" content="noindex, nofollow, noimageindex"><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./styles.css"></head><body><div id="app">${rendered.html}</div><script src="./site.js" defer></script></body></html>\n`;
const builtAssets = path.join(root, 'dist/client/assets');
const styles = fs.readdirSync(builtAssets).filter(f => /^index-.*\.css$/.test(f));
if (styles.length !== 1) throw new Error('Run the current vinext build before static export. Expected one compiled stylesheet.');
fs.copyFileSync(path.join(builtAssets, styles[0]), path.join(out, 'styles.css'));
fs.copyFileSync(path.join(root, 'public/favicon.svg'), path.join(out, 'favicon.svg'));
fs.writeFileSync(path.join(out, 'index.html'), '\ufeff' + html, 'utf8');
const assetPaths = [...new Set([...html.matchAll(/(?:src|href)="\.\/(assets\/[^"<>]+)"/g)].map(m => m[1]))];
for (const relative of assetPaths) {
  const source = path.join(root, 'public', relative);
  assert(fs.existsSync(source), `Missing asset: ${relative}`);
  fs.mkdirSync(path.dirname(path.join(out, relative)), { recursive: true });
  fs.copyFileSync(source, path.join(out, relative));
}
// The itinerary empty state is shown after clearing a saved plan.
for (const animal of ['owl', 'rabbit']) {
  const relative = `assets/animal-icons/${animal}.png`;
  fs.mkdirSync(path.dirname(path.join(out, relative)), { recursive: true });
  fs.copyFileSync(path.join(root, 'public', relative), path.join(out, relative));
}
for (const id of excluded) {
  assert(!html.includes(`id="${id}"`), `Excluded section remains: ${id}`);
  assert(!html.includes(`href="#${id}"`), `Broken excluded-section link: ${id}`);
}
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
for (const m of html.matchAll(/href="#([^"]+)"/g)) assert(ids.has(m[1]), `Broken anchor: ${m[1]}`);
assert(!/(?:src|href)="\/(?!\/)/.test(html), 'Root-relative asset in static HTML');
assert(html.indexOf('book-voucher-plan') < html.indexOf('<footer>'), 'Organizers must stay at the bottom');
assert(!html.includes('id="visitor-tools"'), 'Visitor helper must be excluded');
assert(!/https?:\/\/[^\s"']+\.(?:js|css)/.test(html), 'External runtime dependency');
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
fs.writeFileSync(path.join(out, 'README_使用說明.txt'), '\ufeff佛光山2026書展暨蔬食博覽會｜本機靜態版\n\n解壓縮完整資料夾後，直接雙擊 index.html 開啟，不需安裝 Node.js，也不需登入。\n請保留 index.html、styles.css、site.js、favicon.svg 與 assets 資料夾的相對位置。\n\n本機版不包含每日活動表、線上書展、攤位一覽、參觀小幫手及其選單項目。活動一覽表中的相關活動仍保留。\n手機選單可使用；活動報名等外部連結保留。\nGoogle 表單、地圖等外部連結需要網路。\n已保留 noindex 禁止索引設定。\n\n之後修改以網站原始碼為主，重新匯出本機版，並發布同一份原始碼的線上版。\n正式網址：https://foguangshan-2026-bookfair.bmc-news.chatgpt.site/\n來源 commit：' + commit + '\n', 'utf8');
fs.writeFileSync(path.join(out, 'export-manifest.json'), JSON.stringify({ sourceCommit: commit, excludedSections: excluded, assets: assetPaths, generatedAt: new Date().toISOString() }, null, 2));
console.log(JSON.stringify({ output: out, assetCount: assetPaths.length, excludedSections: excluded, htmlBytes: Buffer.byteLength(html), verified: true }));
