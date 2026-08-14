import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  /**
   * Относительный assetPrefix нужен только статическому экспорту на GitHub Pages.
   * В dev он ломает загрузку клиентских чанков, и гидратация молча не проходит.
   */
  assetPrefix: process.env.NODE_ENV === "production" ? "./" : undefined,
  images: {
    /* Экспорт отдаёт статику, поэтому варианты картинок готовятся заранее
       (scripts/generate-images.mjs), а загрузчик выбирает нужную ширину. */
    loader: "custom",
    loaderFile: "./image-loader.ts",
    deviceSizes: [640, 828, 1080, 1600]
  }
};

export default nextConfig;
