import { Icon, type IconName } from "@/components/ui/icon";
import { TiltCard } from "@/components/ui/tilt-card";
import { benefits } from "@/data/site";

const icons: IconName[] = ["scales", "shield-check", "path", "calendar-check", "user-focus"];
const cardSizes = ["xl:col-span-5", "xl:col-span-3", "xl:col-span-4", "xl:col-span-6", "xl:col-span-6"];

export function Benefits() {
  return (
    <section id="benefits" className="section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]" data-reveal>
        <div className="max-w-2xl">
          <h2 className="text-[clamp(2rem,4vw,3.65rem)] font-extrabold leading-[1.02] tracking-[-0.055em] text-[var(--graphite)]">
            Предсказуемая стройка начинается с ясных договоренностей.
          </h2>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            Собрали для вас главные опоры процесса, чтобы проектирование и строительство не превращались в черный ящик.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
          {benefits.map((benefit, index) => {
            const icon = icons[index];
            return (
              <TiltCard
                key={benefit.title}
                className={`relative min-h-[220px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 ${cardSizes[index]}`}
              >
                <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full border border-[var(--line)]" />
                <Icon name={icon} size={30} weight="duotone" className="relative text-[var(--brick)]" />
                <div className="relative mt-10">
                  <h3 className="text-xl font-extrabold tracking-[-0.045em] text-[var(--graphite)]">{benefit.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--ink-soft)]">{benefit.text}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
