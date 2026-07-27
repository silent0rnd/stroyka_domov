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
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
