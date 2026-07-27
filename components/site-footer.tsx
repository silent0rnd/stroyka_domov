import { TitleBlock } from "@/components/draft/title-block";
import { Icon } from "@/components/ui/icon";

export function SiteFooter() {
  return (
    <footer className="px-4 pb-10 pt-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="group flex items-center gap-2.5">
            <span className="header-mark corner-ticks">Д</span>
            <span className="text-[1.05rem] font-extrabold tracking-[-0.04em]">ДомКирпич</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[var(--ink-soft)]">
            Кирпичные дома под ключ в Москве и Московской области.
          </p>
        </div>

        {/* закрывающий штамп альбома */}
        <TitleBlock
          columns={6}
          className="footer-stamp mt-7"
          cells={[
            { key: "Объект", value: "Кирпичные дома под ключ", span: 2 },
            { key: "Регион", value: "Москва и область" },
            { key: "Телефон", value: "+7 (495) 000-00-00" },
            { key: "Почта", value: "hello@domkirpich.ru" },
            { key: "Лист", value: "12 / 12", accent: true },
            { key: "Адрес офиса", value: "Добавьте перед запуском", span: 2 },
            { key: "Стадия", value: "Приём заявок" },
            { key: "Разработал", value: "Максим Мирошников", span: 2 },
            { key: "Год", value: String(new Date().getFullYear()) }
          ]}
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[var(--graphite)]">
            <a href="#faq" className="inline-flex items-center gap-1 hover:text-[var(--brick-deep)]">
              Вопросы <Icon name="arrow-up-right" size={15} weight="bold" />
            </a>
            <a href="#" className="hover:text-[var(--brick-deep)]">
              Политика конфиденциальности
            </a>
          </div>

          <p className="text-[0.72rem] font-medium text-[var(--ink-soft)]">
            Сайт разработан{" "}
            <a
              href="https://naklikay.ru/"
              target="_blank"
              rel="noopener"
              className="font-bold text-[var(--graphite)] underline decoration-[var(--brick)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--brick-deep)]"
            >
              Максимом Мирошниковым
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
