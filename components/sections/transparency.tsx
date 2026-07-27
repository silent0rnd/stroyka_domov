import { BlueprintMedia } from "@/components/draft/blueprint-media";
import { DrawCheck } from "@/components/draft/draw-check";
import { SectionHead } from "@/components/draft/section-head";
import { transparencyPoints } from "@/data/site";

export function Transparency() {
  return (
    <section className="draft-sheet section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Контроль и гарантии</span>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div data-draw-trigger>
          <SectionHead
            sheet="А-09"
            kicker="Проверяемые обязательства"
            title="Прозрачность, которую можно проверить в процессе."
            lead="Договоренности должны быть видны не только на старте. Поэтому держим процесс стройки понятным на каждом этапе."
            titleClassName="max-w-[12ch]"
            leadClassName="max-w-xl"
          />

          <ul className="mt-9 grid gap-0 sm:grid-cols-2 sm:gap-x-8">
            {transparencyPoints.map((point) => (
              <li key={point} className="check-row">
                <DrawCheck size={19} className="check-row__mark" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <BlueprintMedia
          src="./images/project-pine.png"
          alt="Вариант исполнения кирпичного дома в природном окружении"
          sizes="(max-width: 1023px) 100vw, 45vw"
          parallax
          className="min-h-[390px] lg:min-h-[540px]"
        />
      </div>
    </section>
  );
}
