import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { transparencyPoints } from "@/data/site";

export function Transparency() {
  return (
    <section className="section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16" data-reveal>
        <div>
          <h2 className="max-w-[12ch] text-[clamp(2rem,4.2vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
            Прозрачность, которую можно проверить в процессе.
          </h2>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            Договоренности должны быть видны не только на старте. Поэтому держим процесс стройки понятным на каждом этапе.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {transparencyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 border-t border-[var(--line)] pt-4 text-sm font-extrabold text-[var(--graphite)]">
                <Icon name="check-circle" size={20} weight="fill" className="mt-0.5 shrink-0 text-[var(--brick)]" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="image-frame relative min-h-[390px] lg:min-h-[540px]">
          <Image
            src="./images/project-pine.png"
            alt="Вариант исполнения кирпичного дома в природном окружении"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            data-image-parallax
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
