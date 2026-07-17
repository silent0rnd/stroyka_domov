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
          <span className="w-full text-[0.76rem] font-medium text-[var(--ink-soft)] md:text-right">
            {new Date().getFullYear()} ДомКирпич
          </span>
        </div>
      </div>
    </footer>
  );
}
