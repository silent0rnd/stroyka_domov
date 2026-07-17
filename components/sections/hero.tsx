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

  return (
    <section
      id="top"
      ref={section}
      className="relative isolate overflow-hidden px-4 pb-4 pt-10 sm:px-6 lg:px-10 lg:pb-8 lg:pt-14"
    >
      <div className="architect-grid pointer-events-none absolute inset-x-0 top-0 h-[65%] opacity-50" />
      <div className="relative z-10 mx-auto flex min-h-[570px] max-w-[1440px] items-center py-6 sm:min-h-[610px] lg:min-h-[680px] lg:py-0">
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
      </div>
      <div data-hero-reveal className="hero-visual pointer-events-none relative z-0 -mt-20 min-h-[390px] sm:-mt-28 sm:min-h-[520px] lg:absolute lg:-bottom-[12%] lg:-right-[12%] lg:-top-[8%] lg:mt-0 lg:w-[72%]">
        <Image
          src="./images/hero-blueprint-house.png"
          alt="Премиальный кирпичный дом в переходе от архитектурного чертежа к готовому фасаду"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 72vw"
          className="object-cover object-[62%_center]"
        />
      </div>
    </section>
  );
}
