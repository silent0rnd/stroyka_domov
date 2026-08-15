import { SectionHead } from "@/components/draft/section-head";
import { Icon, type IconName } from "@/components/ui/icon";
import { benefits } from "@/data/site";

const icons: IconName[] = ["scales", "shield-check", "path", "calendar-check", "user-focus"];

export function Benefits() {
  return (
    <section id="benefits" className="draft-sheet section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Ведомость договоренностей</span>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          sheet="А-02"
          kicker="Ведомость договоренностей"
          title="Предсказуемая стройка начинается с ясных договоренностей."
          lead="Собрали главные опоры процесса, чтобы проектирование и строительство не превращались в черный ящик."
          dim={`${benefits.length} позиций`}
          className="max-w-2xl"
          leadClassName="max-w-xl"
        />

        <div className="spec mt-12">
          <div className="spec__head tech-sm tech" aria-hidden="true">
            <span>№</span>
            <span>Наименование</span>
            <span>Что это значит на практике</span>
            <span />
          </div>

          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="spec__row" data-draft="rise">
              <span className="spec__index num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="spec__title">{benefit.title}</h3>
              <p className="spec__text">{benefit.text}</p>
              <Icon name={icons[index]} size={26} weight="duotone" className="spec__icon" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
