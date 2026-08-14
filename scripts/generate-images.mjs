/**
 * Раскладывает каждый исходный PNG из public/images в webp нескольких ширин.
 * Статический экспорт не умеет оптимизировать картинки на лету, поэтому
 * варианты готовятся заранее, а image-loader.ts выбирает нужную ширину.
 *
 * Запускается автоматически перед dev и build; уже готовые файлы пропускает.
 */
import { readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const dir = fileURLToPath(new URL("../public/images/", import.meta.url));

/** Должно совпадать с images.deviceSizes в next.config.ts. */
const widths = [640, 828, 1080, 1600];

const isFresh = async (target, source) => {
  try {
    const [made, origin] = await Promise.all([stat(target), stat(source)]);
    return made.mtimeMs >= origin.mtimeMs;
  } catch {
    return false;
  }
};

const sources = (await readdir(dir)).filter((file) => file.endsWith(".png"));

await Promise.all(
  sources.flatMap((file) =>
    widths.map(async (width) => {
      const source = dir + file;
      const target = dir + file.replace(/\.png$/, `-${width}.webp`);

      if (await isFresh(target, source)) {
        return;
      }

      /* withoutEnlargement: исходники узкие, апскейл дал бы вес без деталей. */
      await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(target);

      console.log(`images: ${file} → ${width}px`);
    })
  )
);
