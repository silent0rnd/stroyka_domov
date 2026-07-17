import { Icon } from "@/components/ui/icon";
import { constructionSteps } from "@/data/site";

export function ConstructionRoute() {
  return (
    <section id="process" className="section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20" data-reveal>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="max-w-[10ch] text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
            Строим по маршруту, который видно целиком.
          </h2>
          <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            От первой встречи до передачи дома каждый этап имеет свою задачу и понятный результат.
          </p>
        </div>
        <ol className="relative grid gap-1">
          <div className="absolute bottom-8 left-[1.12rem] top-8 w-px bg-[var(--line)]" aria-hidden="true">
            <div data-route-line className="route-line h-full w-full bg-[var(--brick)]" />
          </div>
          {constructionSteps.map((step) => (
            <li key={step} className="relative flex gap-5 py-5">
              <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--paper)] text-[var(--brick-deep)]">
                <Icon name="check" size={17} weight="bold" />
              </span>
              <div className="border-b border-[var(--line)] pb-5 pt-1.5 last:border-none">
                <h3 className="text-lg font-extrabold tracking-[-0.035em] text-[var(--graphite)]">{step}</h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
