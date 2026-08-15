import type { Metadata } from "next";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "./globals.css";
import { PaperGrain } from "@/components/draft/paper-grain";

export const metadata: Metadata = {
  title: "ДомКирпич - кирпичные дома под ключ",
  description:
    "Премиальные кирпичные дома под ключ в Москве и Московской области. Предварительный расчет стоимости за один рабочий день.",
  /* Пути относительные: Pages отдаёт сайт из подкаталога /stroyka_domov/. */
  icons: {
    icon: [
      { url: "./icon.svg", type: "image/svg+xml" },
      { url: "./icon.png", type: "image/png", sizes: "32x32" }
    ]
  },
  openGraph: {
    title: "ДомКирпич - кирпичные дома под ключ",
    description:
      "Строим кирпичные дома с фиксированной сметой, понятной этапностью и контролем каждого шага."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <PaperGrain />
      </body>
    </html>
  );
}
