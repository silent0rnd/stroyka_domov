"use client";

import Image from "next/image";
import { useState } from "react";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
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
        <div className="image-frame relative mt-10 aspect-[16/9] min-h-[330px] sm:min-h-[480px]">
          <Image
            src="./images/project-birch.png"
            alt="Вариант исполнения современного кирпичного дома"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <Image
              src="./images/hero-blueprint-house.png"
              alt="Архитектурная визуализация дома на чертеже"
              fill
              sizes="100vw"
              className="object-cover object-[60%_center]"
            />
          </div>
          <div className="pointer-events-none absolute bottom-0 top-0 z-[3] w-px bg-[var(--surface)]" style={{ left: `${position}%` }} aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-lg font-black text-[var(--brick-deep)]">
              ↔
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
