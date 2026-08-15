/**
 * Загрузчик для статического экспорта: подставляет webp-вариант,
 * заранее собранный scripts/generate-images.mjs.
 */
const widths = [640, 828, 1080, 1600];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const closest = widths.find((candidate) => candidate >= width) ?? widths[widths.length - 1];

  /* Должно совпадать с sourceExt в scripts/generate-images.mjs. */
  return src.replace(/\.(png|jpe?g)$/i, `-${closest}.webp`);
}
