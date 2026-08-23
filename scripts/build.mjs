import { cp, mkdir, rm, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const criticalFiles = [
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

for (const file of criticalFiles) {
  const info = await stat(join("public", file));
  if (!info.isFile() || info.size === 0) {
    throw new Error(`Missing or empty critical file: ${file}`);
  }
}

await rm(".vercel/output", { recursive: true, force: true });
await mkdir(".vercel/output/static", { recursive: true });
await cp("public", ".vercel/output/static", { recursive: true });

const commonHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-Permitted-Cross-Domain-Policies": "none"
};

const config = {
  version: 3,
  routes: [
    {
      src: "/(.*)",
      headers: commonHeaders,
      continue: true
    },
    {
      src: "/assets/(.*)",
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      continue: true
    },
    {
      src: "/manifest.webmanifest",
      headers: { "Cache-Control": "public, max-age=3600, must-revalidate" },
      continue: true
    },
    {
      src: "/sw.js",
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Service-Worker-Allowed": "/"
      },
      continue: true
    },
    { handle: "filesystem" }
  ]
};

await writeFile(".vercel/output/config.json", `${JSON.stringify(config, null, 2)}\n`);
console.log(`Production bundle created with ${criticalFiles.length} verified critical files.`);
