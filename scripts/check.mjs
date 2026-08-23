import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const required = [
  "index.html",
  "styles.css",
  "theme-init.js",
  "app.js",
  "sw.js",
  "manifest.webmanifest",
  "assets/favicon-32.png",
  "assets/apple-touch-icon-180.png",
  "assets/app-icon-192.png",
  "assets/app-icon-512.png",
  "assets/app-icon-maskable-512.png",
  "assets/legal-emblem-512.webp",
  "assets/legal-emblem-768.webp",
  "assets/legal-emblem-1024.webp",
  "assets/legal-emblem-1536.webp",
  "assets/legal-emblem-1536.jpg",
  "assets/social-preview-v3-1200x630.jpg"
];

for (const file of required) {
  const info = await stat(join("public", file));
  if (!info.isFile() || info.size === 0) throw new Error(`Invalid file: ${file}`);
}

const html = await readFile("public/index.html", "utf8");
const app = await readFile("public/app.js", "utf8");
const manifest = JSON.parse(await readFile("public/manifest.webmanifest", "utf8"));

const expectations = [
  [html.includes('lang="ar" dir="rtl"'), "Arabic RTL document metadata"],
  [html.includes("المستشار: اسلام خالد السهمودي"), "Arabic legal identity"],
  [html.includes("tel:+201007029081"), "direct call action"],
  [html.includes("https://wa.me/201007029081"), "WhatsApp action"],
  [html.includes("https://maps.app.goo.gl/tei1MtHATtsYZT4h8"), "Google Maps action"],
  [html.includes("social-preview-v3-1200x630.jpg"), "social preview metadata"],
  [html.includes('rel="noopener noreferrer"'), "external-link isolation"],
  [app.includes("serviceWorker.register"), "service worker registration"],
  [app.includes("beforeinstallprompt"), "PWA install flow"],
  [manifest.display === "standalone", "standalone PWA display"],
  [Array.isArray(manifest.icons) && manifest.icons.length >= 3, "PWA icon set"]
];

for (const [ok, label] of expectations) {
  if (!ok) throw new Error(`QA failed: ${label}`);
}

if (/http:\/\//i.test(html)) throw new Error("Insecure HTTP URL found in index.html");
console.log(`QA passed: ${required.length} critical files and ${expectations.length} behavior checks.`);
