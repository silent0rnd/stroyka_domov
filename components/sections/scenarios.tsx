import { Icon } from "@/components/ui/icon";
import { familyScenarios } from "@/data/site";

const scenarioGrid = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

export function Scenarios() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]" data-reveal>
        <div className="max-w-2xl">
          <h2 className="text-[clamp(2rem,4.2vw,3.7rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
            Когда важен не просто дом, а уверенность в каждом решении.
          </h2>
          <p className="mt-5 text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            Мы хорошо понимаем, какие вопросы появляются у семей до первого шага к строительству.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-12">
          {familyScenarios.map((scenario, index) => (
            <article
              key={scenario.title}
              className={`group min-h-[178px] rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--paper-strong)] p-6 ${scenarioGrid[index]}`}
            >
              <Icon name="arrow-up-right" size={22} weight="bold" className="text-[var(--brick)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <h3 className="mt-8 text-xl font-extrabold tracking-[-0.045em] text-[var(--graphite)]">{scenario.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{scenario.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
