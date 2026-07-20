import { Icon } from "@/components/ui/icon";

export function SiteFooter() {
  return (
    <footer className="section-rule px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-[0.6rem] bg-[var(--brick)] text-sm font-black text-[#f8f6f0]">
              Д
            </span>
            <span className="text-[1.05rem] font-extrabold tracking-[-0.04em]">ДомКирпич</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--ink-soft)]">
            Кирпичные дома под ключ в Москве и Московской области.
          </p>
        </div>
        <div className="text-sm leading-7 text-[var(--ink-soft)]">
          <p>+7 (495) 000-00-00</p>
          <p>hello@domkirpich.ru</p>
          <p>Адрес офиса - добавьте перед запуском</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[var(--graphite)] md:justify-end">
          <a href="#faq" className="inline-flex items-center gap-1 hover:text-[var(--brick-deep)]">
            Вопросы <Icon name="arrow-up-right" size={15} weight="bold" />
          </a>
          <a href="#" className="hover:text-[var(--brick-deep)]">Политика конфиденциальности</a>
          <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] font-medium text-[var(--ink-soft)] md:justify-end">
            <span>{new Date().getFullYear()} ДомКирпич</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-[var(--line-strong)] sm:block" />
            <span>
              Сайт разработан{" "}
              <a
                href="https://naklikay.ru/"
                target="_blank"
                rel="noopener"
                className="font-bold text-[var(--graphite)] underline decoration-[var(--brick)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--brick-deep)]"
              >
                Максимом Мирошниковым
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
