import { promises as fs } from "node:fs";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const basePath = "/foguangshan-2026-bookfair";
const textExtensions = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ".rsc"]);
const rootAssets = ["file.svg", "globe.svg", "window.svg", "favicon.svg"];

async function* walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(fullPath);
    else yield fullPath;
  }
}

for await (const filePath of walk(outputDirectory)) {
  if (!textExtensions.has(path.extname(filePath))) continue;

  const original = await fs.readFile(filePath, "utf8");
  let updated = original;

  // Plain <img> URLs are intentionally kept root-relative in the Sites build.
  // Prefix them only in the exported GitHub Pages artifact.
  updated = updated
    .replaceAll('"/assets/', `"${basePath}/assets/`)
    .replaceAll("'/assets/", `'${basePath}/assets/`)
    .replaceAll("`/assets/", `\`${basePath}/assets/`)
    .replaceAll("url(/assets/", `url(${basePath}/assets/`)
    // Vite's preload helper receives paths such as "assets/chunk.js" and
    // normally anchors them at /. Point those preload requests at the project
    // site instead.
    .replaceAll("return`/`+e", `return\`${basePath}/\`+e`);

  for (const asset of rootAssets) {
    updated = updated
      .replaceAll(`"/${asset}`, `"${basePath}/${asset}`)
      .replaceAll(`'/${asset}`, `'${basePath}/${asset}`)
      .replaceAll(`\`/${asset}`, `\`${basePath}/${asset}`);
  }

  if (updated !== original) await fs.writeFile(filePath, updated);
}

await fs.writeFile(path.join(outputDirectory, ".nojekyll"), "");
