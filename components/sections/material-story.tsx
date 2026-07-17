import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { materialReasons } from "@/data/site";

export function MaterialStory() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16" data-reveal>
        <div className="image-frame relative min-h-[430px] lg:min-h-[620px]">
          <Image
            src="./images/project-courtyard.png"
            alt="Архитектурное решение кирпичного дома с внутренним двором"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            data-image-parallax
            className="object-cover"
          />
        </div>
        <div>
          <p className="section-kicker">Смысл материала</p>
          <h2 className="mt-5 max-w-[11ch] text-[clamp(2rem,4.2vw,3.8rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
            Кирпич дает дому ощущение опоры.
          </h2>
          <p className="mt-5 max-w-lg text-[0.98rem] leading-7 text-[var(--ink-soft)]">
            Это не только про фасад. Материал помогает собрать спокойное, теплое и выразительное пространство для семьи.
          </p>
          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {materialReasons.map((reason) => (
              <div key={reason.title} className="border-t border-[var(--line)] pt-4">
                <h3 className="text-[0.94rem] font-extrabold text-[var(--graphite)]">{reason.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{reason.text}</p>
              </div>
            ))}
          </div>
          <a href="#projects" className="button-secondary mt-9">
            Посмотреть варианты
            <Icon name="arrow-right" size={17} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
