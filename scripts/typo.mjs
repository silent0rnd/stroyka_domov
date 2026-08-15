/**
 * Типографика исходников: короткие служебные слова связываем неразрывным
 * пробелом со следующим словом, длинные тире меняем на дефис.
 *
 * Правки идут прямо в исходники — строки комментариев не трогаем.
 * Запуск после добавления новых текстов: node scripts/typo.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";

const NBSP = " ";

/** Предлоги, союзы и частицы, которые не должны висеть в конце строки. */
const SHORT_WORDS =
  "во|со|ко|обо|ото|подо|надо|изо|про|при|над|под|для|без|из|от|до|за|на|по|об|не|ни|но|как|что|в|с|к|у|о|а|и";

const bindShortWords = (text) =>
  text.replace(
    new RegExp(`(?<![\\p{L}\\p{N}-])(${SHORT_WORDS}) +(?=[\\p{L}\\p{N}])`, "giu"),
    `$1${NBSP}`
  );

const shortDashes = (text) =>
  text
    /* тире между словами становится дефисом и прилипает к предыдущему слову */
    .replace(/ +[—–‒−] +/g, `${NBSP}- `)
    /* диапазоны и всё остальное — просто дефис */
    .replace(/[—–‒‑−]/g, "-");

/* ponytail: комментарии ищем построчно, без разбора синтаксиса — «/*» внутри
   строкового литерала собьёт счётчик. Появится такой литерал — тогда и парсер. */
const typo = (source) => {
  let inBlock = false;

  return source
    .split("\n")
    .map((line) => {
      const isComment = inBlock || /^\s*\{?\s*(\/\/|\/\*|\*)/.test(line);
      const opens = line.lastIndexOf("/*");
      const closes = line.lastIndexOf("*/");

      inBlock = opens > closes ? true : closes > opens ? false : inBlock;

      /* в комментариях связки не нужны — и заодно снимаем их, если уже попали */
      return isComment ? line.replaceAll(NBSP, " ") : bindShortWords(shortDashes(line));
    })
    .join("\n");
};

function selfCheck() {
  assert.equal(typo("Строим по маршруту"), `Строим по${NBSP}маршруту`);
  assert.equal(typo("дома. С понятной сметой"), `дома. С${NBSP}понятной сметой`);
  assert.equal(typo("Каждый ряд — по уровню"), `Каждый ряд${NBSP}- по${NBSP}уровню`);
  assert.equal(typo("{low}–{high}"), "{low}-{high}");
  /* код и латиница не трогаются */
  assert.equal(typo('sizes="(max-width: 1023px) 100vw"'), 'sizes="(max-width: 1023px) 100vw"');
  assert.equal(typo(" * комментарий — не трогаем и не связываем"), " * комментарий — не трогаем и не связываем");
  assert.equal(typo("{/* линейка над кадром */}"), "{/* линейка над кадром */}");
  assert.equal(typo("/* первая строка\n   вторая строка и хвост */"), "/* первая строка\n   вторая строка и хвост */");
  assert.equal(typo(`/* уже связанный\n   хвост с${NBSP}связкой */`), "/* уже связанный\n   хвост с связкой */");
  /* слово внутри другого слова не ловится */
  assert.equal(typo("Внутренний сад"), "Внутренний сад");
  assert.equal(typo("Кто-то и вы"), `Кто-то и${NBSP}вы`);
}

selfCheck();

const files = ["data", "app", "components"].flatMap((dir) =>
  readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((name) => /\.tsx?$/.test(name))
    .map((name) => `${dir}/${name}`)
);
let changed = 0;

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const next = typo(source);

  if (next !== source) {
    writeFileSync(file, next, "utf8");
    changed += 1;
    console.log(`typo: ${file}`);
  }
}

console.log(`typo: обработано ${files.length}, изменено ${changed}`);
