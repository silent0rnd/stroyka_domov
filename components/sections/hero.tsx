"use client";

import { useGSAP } from "@gsap/react";
import { ArrowRight, Ruler, Timer } from "@phosphor-icons/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        return;
      }

      const timeline = gsap.timeline();

      timeline
        .from("[data-hero-reveal]", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out"
        })
        .fromTo("[data-hero-visual]", {
          autoAlpha: 0,
          clipPath: "inset(0 0 0 34%)"
        }, {
          autoAlpha: 1,
          clipPath: "inset(0 0 0 0%)",
          duration: 1.35,
          ease: "power3.out"
        }, "<0.18")
        .fromTo("[data-hero-sweep]", {
          autoAlpha: 0,
          xPercent: -120
        }, {
          autoAlpha: 0.9,
          xPercent: 215,
          duration: 1.15,
          ease: "power2.inOut"
        }, "<0.16");
    },
    { scope: section, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return (
    <section
      id="top"
      ref={section}
      className="relative isolate overflow-hidden px-4 pb-4 pt-10 sm:px-6 lg:px-10 lg:pb-8 lg:pt-14"
    >
      <div className="architect-grid pointer-events-none absolute inset-x-0 top-0 h-[65%] opacity-50" />
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 py-6 sm:gap-12 lg:min-h-[680px] lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1.34fr)] lg:gap-12 lg:py-0">
        <div className="max-w-xl lg:pt-2">
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
          <div data-hero-reveal className="hero-facts mt-7 flex max-w-[31rem] flex-wrap">
            <div className="hero-fact flex items-center gap-3">
              <Ruler size={22} weight="duotone" className="text-[var(--brick)]" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Стоимость</p>
                <p className="mt-0.5 text-sm font-extrabold">от 12 млн ₽</p>
              </div>
            </div>
            <div className="hero-fact flex items-center gap-3">
              <Timer size={22} weight="duotone" className="text-[var(--brick)]" aria-hidden="true" />
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Срок</p>
                <p className="mt-0.5 text-sm font-extrabold">от 8 месяцев</p>
              </div>
            </div>
          </div>
        </div>
        <div data-hero-visual className="hero-visual pointer-events-none relative min-h-[350px] sm:min-h-[470px] lg:min-h-[520px]">
          <div className="hero-sheet absolute inset-0">
            <div className="hero-sheet-header">
              <span>А-01 / Фасад</span>
              <span>Стадия: эскиз</span>
            </div>
            <div className="hero-sheet-body">
              <div className="hero-sheet-ruler" aria-hidden="true">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <div className="hero-sheet-canvas">
                <Image
                  src="./images/hero-blueprint-house.png"
                  alt="Премиальный кирпичный дом в переходе от архитектурного чертежа к готовому фасаду"
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  className="object-cover object-[58%_center]"
                />
                <span className="hero-measure hero-measure-horizontal">24 000 мм</span>
                <span className="hero-measure hero-measure-vertical">9 450 мм</span>
                <span className="hero-drawing-note">Кирпичный фасад</span>
                <span data-hero-sweep className="hero-construction-sweep" aria-hidden="true" />
              </div>
            </div>
            <div className="hero-sheet-footer">
              <span>Проект жилого дома</span>
              <span>М 1:100</span>
              <span>Лист 01</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
