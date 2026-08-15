import { SectionHead } from "@/components/draft/section-head";
import { Icon } from "@/components/ui/icon";
import { familyScenarios } from "@/data/site";

const scenarioGrid = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

/** Схемы планировок, отрисованные линиями — по одной на сценарий. */
const plans = [
  "M4 4 H44 V32 H4 Z M4 18 H28 M28 18 V32 M34 4 V18",
  "M4 8 H30 V36 H4 Z M30 14 H46 V36 H30 M4 22 H30",
  "M6 6 H42 V34 H6 Z M18 6 V34 M30 6 V34 M18 20 H30",
  "M4 6 H46 V22 H4 Z M4 26 H26 V38 H4 Z M32 26 H46 V38 H32 Z"
];

export function Scenarios() {
  return (
    <section className="draft-sheet px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Варианты компоновки</span>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <SectionHead
          sheet="А-09"
          kicker="Сценарии семьи"
          title="Когда важен не просто дом, а уверенность в каждом решении."
          lead="Мы хорошо понимаем, какие вопросы появляются у семей до первого шага к строительству."
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {familyScenarios.map((scenario, index) => (
            <article
              key={scenario.title}
              data-draw-trigger
              className={`scenario ${scenarioGrid[index]}`}
            >
              <div className="scenario__head">
                <svg viewBox="0 0 50 42" className="scenario__plan" aria-hidden="true">
                  <path
                    data-draw
                    d={plans[index]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="miter"
                  />
                </svg>
                <Icon
                  name="arrow-up-right"
                  size={20}
                  weight="bold"
                  className="scenario__arrow"
                />
              </div>

              <h3 className="mt-7 text-xl font-extrabold tracking-[-0.045em] text-[var(--graphite)]">
                {scenario.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{scenario.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
