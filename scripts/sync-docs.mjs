/**
 * Копирует статический экспорт из out/ в docs/ — папку, из которой GitHub Pages
 * раздаёт сайт (Settings → Pages → ветка main, папка /docs).
 *
 * out/ в .gitignore и живёт только локально, docs/ лежит в репозитории.
 * Без этого шага docs/ остаётся от прошлой сборки и опубликованный сайт
 * отстаёт от кода.
 *
 * Запускается автоматически после build.
 */
import { cp, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../out/", import.meta.url));
const docs = fileURLToPath(new URL("../docs/", import.meta.url));

await rm(docs, { recursive: true, force: true });
await cp(out, docs, { recursive: true });

/** Без этого файла Jekyll на Pages выбрасывает _next/ и сайт остаётся без стилей. */
await writeFile(new URL("../docs/.nojekyll", import.meta.url), "");

console.log("docs/ обновлена из out/");
