"use client";

import { ArrowsHorizontal } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/draft/section-head";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentSection = section.current;

    if (!currentSection || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      window.setTimeout(() => setPosition(46), 450);
      window.setTimeout(() => setPosition(52), 1500);
      observer.disconnect();
    }, { threshold: 0.45 });

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={section} className="draft-sheet px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Сравнение стадий</span>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHead
            sheet="А-11"
            kicker="Проект / исполнение"
            title="От архитектурной идеи к готовому фасаду."
            lead="Сравните образ проекта и вариант исполнения. Перемещайте разделитель мышью, касанием или клавишами."
            className="max-w-2xl"
          />
          <p className="tech-sm tech text-[var(--ink-faint)]">
            Совмещение <span className="num text-[var(--brick-deep)]">{position}%</span>
          </p>
        </div>

        {/* линейка над кадром показывает положение разделителя как размер */}
        <div className="ba-ruler" aria-hidden="true">
          <span className="ba-ruler__ticks" />
          <span className="ba-ruler__cursor num tech-sm" style={{ left: `${position}%` }}>
            {position}
          </span>
        </div>

        <div className="before-after-stage relative aspect-[16/9] min-h-[330px] sm:min-h-[480px]">
          <Image
            src="./images/facade-built.png"
            alt="Вариант исполнения современного кирпичного дома"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 overflow-hidden transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <Image
              src="./images/facade-blueprint.png"
              alt="Архитектурная визуализация дома на чертеже"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <span className="before-after-label absolute left-5 top-5 z-[2]">Лист А-01 · Чертеж</span>
          <span className="before-after-label absolute right-5 top-5 z-[2]">Факт · Готовый фасад</span>
          <div
            className="ba-split pointer-events-none absolute bottom-0 top-0 z-[3]"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            <span className="ba-split__handle">
              <ArrowsHorizontal size={19} weight="bold" aria-hidden="true" />
            </span>
            <span className="ba-split__readout num tech-sm">{position}%</span>
          </div>
          <input
            className="before-after-range"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label="Сравнение архитектурной идеи и варианта исполнения"
          />
        </div>
      </div>
    </section>
  );
}
