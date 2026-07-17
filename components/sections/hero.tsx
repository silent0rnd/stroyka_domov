"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, Ruler, Timer } from "@phosphor-icons/react";
import gsap from "gsap";
import Image from "next/image";
import { type PointerEvent, useRef } from "react";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const imageLayer = useRef<HTMLDivElement>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out"
      });
    },
    { scope: section, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (
      prefersReducedMotion ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover)").matches ||
      !imageLayer.current
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(imageLayer.current, {
      x: x * -12,
      y: y * -9,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  return (
    <section
      id="top"
      ref={section}
      className="relative overflow-hidden px-4 pb-12 pt-10 sm:px-6 lg:px-10 lg:pb-16 lg:pt-14"
      onPointerMove={handlePointerMove}
    >
      <div className="architect-grid pointer-events-none absolute inset-x-0 top-0 h-[65%] opacity-50" />
      <div className="mx-auto grid min-h-[690px] max-w-[1440px] items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
        <div className="relative z-10 max-w-xl lg:pt-2">
          <p data-hero-reveal className="section-kicker">Строим в Москве и области</p>
          <h1
            data-hero-reveal
            className="mt-5 max-w-[13ch] text-[clamp(2.5rem,4.2vw,4.5rem)] font-extrabold leading-[0.96] tracking-[-0.075em] text-[var(--graphite)]"
          >
            Кирпичный дом. Надолго.
          </h1>
          <p data-hero-reveal className="mt-6 max-w-[46ch] text-[1rem] leading-7 text-[var(--ink-soft)] sm:text-[1.05rem]">
            Берем на себя путь от идеи до передачи дома. С понятной сметой, сроками и регулярным контролем работ.
          </p>
          <div data-hero-reveal className="mt-7 flex flex-wrap gap-3">
            <a href="#calculator" className="button-primary">
              Рассчитать стоимость
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a href="#projects" className="button-secondary">Смотреть проекты</a>
          </div>
          <div data-hero-reveal className="mt-8 flex flex-wrap gap-3">
            <div className="glass-panel flex min-w-[9.4rem] items-center gap-3 rounded-[0.8rem] px-3.5 py-3">
              <Ruler size={22} weight="duotone" className="text-[var(--brick)]" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Стоимость</p>
                <p className="mt-0.5 text-sm font-extrabold">от 12 млн ₽</p>
              </div>
            </div>
            <div className="glass-panel flex min-w-[9.4rem] items-center gap-3 rounded-[0.8rem] px-3.5 py-3">
              <Timer size={22} weight="duotone" className="text-[var(--brick)]" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Срок</p>
                <p className="mt-0.5 text-sm font-extrabold">от 8 месяцев</p>
              </div>
            </div>
          </div>
        </div>

        <div data-hero-reveal className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[620px]">
          <div className="absolute -right-4 top-[8%] h-[76%] w-[84%] rounded-[1.8rem] border border-[var(--line)] bg-[var(--paper-strong)]" />
          <div ref={imageLayer} className="image-frame absolute inset-x-0 bottom-0 top-4 z-10 sm:left-7 sm:right-0 sm:top-0">
            <Image
              src="/images/hero-blueprint-house.png"
              alt="Премиальный кирпичный дом в переходе от архитектурного чертежа к готовому фасаду"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover object-[62%_center]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
