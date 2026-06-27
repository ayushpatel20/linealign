import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Copy images directory to public/images at startup
const srcDir = path.join(process.cwd(), "images");
const destDir = path.join(process.cwd(), "public", "images");

if (fs.existsSync(srcDir)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
