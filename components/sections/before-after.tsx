"use client";

import { ArrowsHorizontal } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    <section ref={section} className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]" data-reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4.2vw,3.7rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]">
              От архитектурной идеи к готовому фасаду.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-7 text-[var(--ink-soft)]">
              Сравните образ проекта и вариант исполнения. Перемещайте разделитель мышью, касанием или клавишами.
            </p>
          </div>
          <p className="text-sm font-extrabold text-[var(--brick-deep)]">Проект / вариант исполнения</p>
        </div>
        <div className="before-after-stage relative mt-10 aspect-[16/9] min-h-[330px] sm:min-h-[480px]">
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
          <span className="before-after-label absolute left-5 top-5 z-[2]">Чертеж</span>
          <span className="before-after-label absolute right-5 top-5 z-[2]">Готовый фасад</span>
          <div className="pointer-events-none absolute bottom-0 top-0 z-[3] w-px bg-[var(--surface)] transition-[left] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ left: `${position}%` }} aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--brick-deep)]">
              <ArrowsHorizontal size={20} weight="bold" aria-hidden="true" />
            </span>
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
