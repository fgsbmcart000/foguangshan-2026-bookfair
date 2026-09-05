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
  const start = page.indexOf(`        <section className="section ${id === 'online' ? 'online' : id === 'booths' ? 'booth' : id === 'visitor-tools' ? 'visitor-tools' : 'schedule'}-section" id="${id}"`);
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
const publicUrl = 'https://foguangshan-2026-bookfair.bmc-news.chatgpt.site/';
const localTitle = '佛光山2026書展暨蔬食博覽會｜吉祥動物派對・高雄免費活動';
const localDescription = '佛光山2026年書展暨蔬食博覽會「吉祥動物派對」11月7日至13日於高雄佛光山佛陀紀念館登場，包含書展、蔬食博覽會、藝術特展、名家講座、親子體驗與環境教育，免費參觀。';
const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${publicUrl}#website`,
      url: publicUrl,
      name: '佛光山2026年書展暨蔬食博覽會',
      alternateName: 'Fo Guang Shan 2026 Book Fair and Vegetarian Expo',
      inLanguage: 'zh-Hant',
    },
    {
      '@type': 'ExhibitionEvent',
      '@id': `${publicUrl}#event`,
      name: '佛光山2026年書展暨蔬食博覽會－吉祥動物派對',
      alternateName: 'Fo Guang Shan 2026 Book Fair and Vegetarian Expo — Auspicious Animal Festival',
      url: publicUrl,
      description: localDescription,
      startDate: '2026-11-07T09:00:00+08:00',
      endDate: '2026-11-13T18:00:00+08:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
      image: [`${publicUrl}assets/hero-horizontal.jpg`],
      location: {
        '@type': 'Place',
        name: '佛光山佛陀紀念館',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '統嶺路1號',
          addressLocality: '大樹區',
          addressRegion: '高雄市',
          postalCode: '840',
          addressCountry: 'TW',
        },
      },
      organizer: { '@type': 'Organization', name: '財團法人人間文教基金會', url: publicUrl },
      offers: {
        '@type': 'Offer',
        url: publicUrl,
        price: '0',
        priceCurrency: 'TWD',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-09-05T00:00:00+08:00',
      },
      audience: { '@type': 'Audience', audienceType: '親子家庭、閱讀愛好者、蔬食與藝文活動參與者' },
      keywords: '佛光山書展,蔬食博覽會,高雄免費活動,高雄親子活動,佛陀紀念館活動',
    },
  ],
}, null, 2);
const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(localTitle)}</title><meta name="description" content="${escape(localDescription)}"><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><meta name="keywords" content="佛光山2026書展,佛光山書展,蔬食博覽會,吉祥動物派對,佛陀紀念館活動,高雄免費活動,高雄親子活動,洪易藝術展,素食展"><meta name="author" content="財團法人人間文教基金會"><meta name="theme-color" content="#208784"><link rel="canonical" href="${publicUrl}"><link rel="alternate" hreflang="zh-Hant" href="${publicUrl}"><link rel="alternate" hreflang="x-default" href="${publicUrl}"><meta property="og:locale" content="zh_TW"><meta property="og:type" content="website"><meta property="og:site_name" content="佛光山2026年書展暨蔬食博覽會"><meta property="og:title" content="佛光山2026書展暨蔬食博覽會｜吉祥動物派對"><meta property="og:description" content="11月7日至13日於高雄佛光山佛陀紀念館登場，書展、蔬食、藝術特展、名家講座與親子體驗，免費參觀。"><meta property="og:url" content="${publicUrl}"><meta property="og:image" content="${publicUrl}assets/hero-horizontal.jpg"><meta property="og:image:width" content="1920"><meta property="og:image:height" content="1080"><meta property="og:image:alt" content="佛光山2026年書展暨蔬食博覽會吉祥動物派對主視覺"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="佛光山2026書展暨蔬食博覽會｜吉祥動物派對"><meta name="twitter:description" content="11月7日至13日於高雄佛光山佛陀紀念館登場，免費參觀。"><meta name="twitter:image" content="${publicUrl}assets/hero-horizontal.jpg"><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./styles.css"><script type="application/ld+json">${structuredData}</script></head><body><div id="app">${rendered.html}</div><script src="./site.js" defer></script></body></html>
`;
const builtAssets = path.join(root, 'dist/client/assets');
const styles = fs.readdirSync(builtAssets).filter(f => /^index-.*\.css$/.test(f));
if (styles.length !== 1) throw new Error('Run the current vinext build before static export. Expected one compiled stylesheet.');
fs.copyFileSync(path.join(builtAssets, styles[0]), path.join(out, 'styles.css'));
fs.copyFileSync(path.join(root, 'public/favicon.svg'), path.join(out, 'favicon.svg'));
fs.writeFileSync(path.join(out, 'index.html'), '\ufeff' + html, 'utf8');
const assetPaths = [...new Set([...html.matchAll(/(?:src|srcset|href)="\.\/(assets\/[^"<>]+)"/gi)].map(m => m[1]))];
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
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${publicUrl}sitemap.xml\n`, 'utf8');
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>${publicUrl}</loc><lastmod>2026-09-05</lastmod><image:image><image:loc>${publicUrl}assets/hero-horizontal.jpg</image:loc><image:title>佛光山2026年書展暨蔬食博覽會吉祥動物派對</image:title><image:caption>2026年11月7日至13日於佛光山佛陀紀念館舉行</image:caption></image:image></url></urlset>\n`, 'utf8');
fs.writeFileSync(path.join(out, 'SEO_上線說明.txt'), `佛光山2026書展暨蔬食博覽會｜SEO 上線說明\n\n本版已加入搜尋結果標題與摘要、canonical、社群分享資訊、活動 JSON-LD 結構化資料、robots.txt 與 sitemap.xml。\n將完整資料夾部署到正式網址後，請在 Google Search Console 提交 sitemap.xml 並要求建立首頁索引。\n直接以 file:/// 開啟的本機檔案不會被搜尋引擎檢索。\n\n正式網址：${publicUrl}\n`, 'utf8');
fs.writeFileSync(path.join(out, 'README_使用說明.txt'), '\ufeff佛光山2026書展暨蔬食博覽會｜本機靜態版\n\n解壓縮完整資料夾後，直接雙擊 index.html 開啟，不需安裝 Node.js，也不需登入。\n請保留 index.html、styles.css、site.js、favicon.svg、robots.txt、sitemap.xml 與 assets 資料夾的相對位置。\n\n本機版不包含每日活動表、線上書展、攤位一覽、參觀小幫手及其選單項目。活動一覽表中的相關活動仍保留。\n手機選單可使用；活動報名等外部連結保留。\nGoogle 表單、地圖等外部連結需要網路。\n本機版已加入 SEO 收錄資訊；部署到公開網址後才可被搜尋引擎檢索。\n\n之後修改以網站原始碼為主，重新匯出本機版，並發布同一份原始碼的線上版。\n正式網址：https://foguangshan-2026-bookfair.bmc-news.chatgpt.site/\n來源 commit：' + commit + '\n', 'utf8');
fs.writeFileSync(path.join(out, 'export-manifest.json'), JSON.stringify({ sourceCommit: commit, excludedSections: excluded, assets: assetPaths, generatedAt: new Date().toISOString() }, null, 2));
console.log(JSON.stringify({ output: out, assetCount: assetPaths.length, excludedSections: excluded, htmlBytes: Buffer.byteLength(html), verified: true }));
