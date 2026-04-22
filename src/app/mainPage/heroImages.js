import fs from "fs";
import path from "path";

export async function getHeroImages() {
  const heroDir = path.join(process.cwd(), "public/imgs/hero");
  const files = fs.readdirSync(heroDir);
  const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  const baseNameMap = new Map();
  for (const file of imageFiles) {
    const baseName = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");
    const ext = path.extname(file).toLowerCase();
    const current = baseNameMap.get(baseName);
    if (!current) {
      baseNameMap.set(baseName, file);
    } else {
      const currentExt = path.extname(current).toLowerCase();
      if (currentExt !== ".webp" && ext === ".webp") {
        baseNameMap.set(baseName, file);
      }
    }
  }

  return Array.from(baseNameMap.values()).map((file) => `/imgs/hero/${file}`);
}