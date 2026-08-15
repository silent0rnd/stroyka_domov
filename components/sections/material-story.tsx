import { BlueprintMedia } from "@/components/draft/blueprint-media";
import { SectionHead } from "@/components/draft/section-head";
import { Icon } from "@/components/ui/icon";
import { materialReasons } from "@/data/site";

export function MaterialStory() {
  return (
    <section className="draft-sheet px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Смысл материала</span>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <div className="material-frame">
          <BlueprintMedia
            src="./images/project-courtyard.png"
            alt="Одноэтажный кирпичный дом с закрытым внутренним двором"
            sizes="(max-width: 1023px) 100vw, 48vw"
            className="material-media min-h-[400px] lg:min-h-[560px]"
          />
        </div>

        <div>
          <SectionHead
            sheet="А-03"
            kicker="Смысл материала"
            title="Кирпич дает дому ощущение опоры."
            lead="Это не только про фасад. Материал помогает собрать спокойное, теплое и выразительное пространство для семьи."
            titleClassName="max-w-[42rem] text-[clamp(2rem,3.6vw,3.3rem)]"
            leadClassName="max-w-lg"
          />

          <ol className="mt-8 grid gap-0">
            {materialReasons.map((reason, index) => (
              <li key={reason.title} data-draft="rise" className="material-reason">
                <span className="material-reason__index num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[0.95rem] font-extrabold text-[var(--graphite)]">{reason.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{reason.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <a href="#projects" className="button-secondary mt-8">
            Посмотреть варианты
            <Icon name="arrow-right" size={17} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
