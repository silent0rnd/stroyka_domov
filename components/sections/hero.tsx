"use client";

import { ArrowRight, Ruler, Timer } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { BlueprintMedia } from "@/components/draft/blueprint-media";
import { TitleBlock } from "@/components/draft/title-block";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Деления верхней линейки листа, в метрах. */
const topMarks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
/** Деления боковой линейки листа. */
const leftMarks = [0, 2, 4, 6, 8, 10];

/** Выноски к узлам фасада — появляются при прокрутке закреплённого листа. */
const callouts = [
  { label: "Облицовочный кирпич", top: "38%", left: "62%" },
  { label: "Плоская кровля", top: "17%", left: "78%" },
  { label: "Переход: чертёж — факт", top: "62%", left: "31%" }
];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = section.current;

    if (!scope) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".hero-media", { "--wipe": "100%" });
      gsap.set("[data-hero-wire]", { autoAlpha: 0 });
      gsap.set("[data-hero-callout], [data-hero-dim]", { autoAlpha: 1 });
      return;
    }

    const context = gsap.context(() => {}, scope);
    let titleSplit: SplitText | null = null;
    let cancelled = false;

    const build = () => {
      if (cancelled) {
        return;
      }

      context.add(() => {
        /* Заголовок режем на строки, чтобы заливка шла по всем словам,
           а не только по первому. Контур-дубликат лежит ровно под ним. */
        titleSplit = new SplitText("[data-hero-title]", { type: "lines", linesClass: "draft-line" });
        scope.querySelector("[data-hero-title]")?.classList.add("draft-lines");
        gsap.set(titleSplit.lines, { "--fill": "0%" });

        /* --- вступление: лист собирается, дом проявляется из чертежа --- */
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .from("[data-hero-reveal]", { autoAlpha: 0, y: 26, duration: 0.85, stagger: 0.085 })
          .to(
            titleSplit.lines,
            { "--fill": "100%", duration: 1, stagger: 0.22, ease: "power2.inOut" },
            "<0.25"
          )
          /* контур больше не нужен: заливка его перекрыла */
          .to("[data-hero-wire]", { autoAlpha: 0, duration: 0.45 }, "-=0.3")
          .from("[data-hero-sheet]", { autoAlpha: 0, duration: 0.6 }, "<0.1")
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left center", duration: 0.9 }, "<0.1")
          .from("[data-hero-rule-v]", { scaleY: 0, transformOrigin: "center top", duration: 0.9 }, "<")
          .fromTo(
            ".hero-media",
            { "--wipe": "0%" },
            {
              "--wipe": "100%",
              duration: 1.7,
              ease: "power2.inOut",
              onStart: () => document.querySelector(".hero-media")?.setAttribute("data-drawing", "true"),
              onComplete: () => {
                const media = document.querySelector(".hero-media");
                media?.removeAttribute("data-drawing");
                media?.setAttribute("data-drawn", "true");
              }
            },
            "<0.2"
          )
          .from("[data-hero-stamp] .title-block__cell", { autoAlpha: 0, duration: 0.35, stagger: 0.06 }, "-=0.9");

        /* --- проход детализации: размеры и выноски ложатся на фасад ---
           Стартовые состояния задаём отдельно: в scrub-таймлайне fromTo
           отрисовывает начальные значения только у первого твина. */
        const drawDetail = (timeline: gsap.core.Timeline) => {
          gsap.set("[data-hero-dim]", { autoAlpha: 0, "--serif": 0 });
          gsap.set("[data-hero-dim] .dim__bar", { scaleX: 0 });
          gsap.set("[data-hero-dim] .dim-v__bar", { scaleY: 0 });
          gsap.set("[data-hero-callout]", { autoAlpha: 0, x: -12 });

          return timeline
            .to("[data-hero-dim]", { autoAlpha: 1, duration: 0.4, stagger: 0.12 })
            .to("[data-hero-dim] .dim__bar", { scaleX: 1, duration: 0.6 }, "<")
            .to("[data-hero-dim] .dim-v__bar", { scaleY: 1, duration: 0.6 }, "<")
            .to("[data-hero-dim]", { "--serif": 1, duration: 0.25 }, "-=0.3")
            .to("[data-hero-dim] .dim__val, [data-hero-dim] .dim-v__val", { opacity: 1, duration: 0.3 }, "<")
            .to("[data-hero-callout]", { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.22 }, "-=0.2");
        };

        const media = gsap.matchMedia();

        /* На широких экранах лист закрепляется и детализируется скроллом. */
        media.add("(min-width: 1024px)", () => {
          drawDetail(
            gsap.timeline({
              scrollTrigger: {
                trigger: section.current,
                start: "top top",
                end: "+=70%",
                pin: true,
                pinSpacing: true,
                scrub: 0.6,
                anticipatePin: 1
              }
            })
          ).to("[data-hero-callout]", { duration: 0.5 });
        });

        /* На узких экранах пиннинг мешает — тот же проход, но по появлению. */
        media.add("(max-width: 1023px)", () => {
          drawDetail(
            gsap.timeline({
              scrollTrigger: { trigger: stage.current, start: "top 70%", once: true }
            })
          );
        });

        ScrollTrigger.refresh();
      });
    };

    /* Строки режем только после загрузки шрифтов, иначе разбивка съедет
       и контур-дубликат перестанет совпадать с заливкой. */
    const fonts = document.fonts?.ready ?? Promise.resolve();

    /* Вайп проявляет фотографию, поэтому ждём и сам кадр — иначе «проявление»
       проходит по пустому месту. Ошибку загрузки считаем готовностью:
       без этого вступление не стартует вообще. */
    const image = scope.querySelector<HTMLImageElement>(".hero-media img");
    const frame =
      !image || image.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });

    Promise.all([fonts, frame]).then(build);

    return () => {
      cancelled = true;
      titleSplit?.revert();
      context.revert();
    };
  }, []);

  return (
    <section id="top" ref={section} className="hero relative isolate overflow-hidden px-4 pb-6 pt-10 sm:px-6 lg:px-10 lg:pb-10 lg:pt-14">
      <div className="architect-grid hero__grid pointer-events-none absolute inset-x-0 top-0 h-[72%]" />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 py-4 sm:gap-12 lg:min-h-[660px] lg:grid-cols-[minmax(0,0.64fr)_minmax(0,1.36fr)] lg:gap-14 lg:py-0">
        <div className="max-w-xl lg:pt-2">
          <p data-hero-reveal className="sheet-head__meta tech">
            <span className="sheet-head__code">А-01</span>
            <span className="sheet-head__rule" aria-hidden="true" />
            <span>Москва и область</span>
          </p>

          <div className="hero-title mt-6">
            <span data-hero-wire className="hero-title__layer hero-title__wire" aria-hidden="true">
              Кирпичный дом под ключ
            </span>
            <h1 data-hero-title className="hero-title__layer hero-title__solid">
              Кирпичный дом под ключ
            </h1>
          </div>

          <p data-hero-reveal className="mt-6 max-w-[46ch] text-[1rem] leading-7 text-[var(--ink-soft)] sm:text-[1.05rem]">
            Берем на себя путь от идеи до передачи дома. С понятной сметой, сроками и регулярным контролем работ.
          </p>

          <div data-hero-reveal className="mt-8 flex flex-wrap gap-3">
            <a href="#calculator" className="button-primary">
              Рассчитать стоимость
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a href="#projects" className="button-secondary">Смотреть проекты</a>
          </div>

          <div data-hero-reveal className="hero-facts mt-8 flex max-w-[31rem] flex-wrap">
            <div className="hero-fact flex items-center gap-3">
              <Ruler size={22} weight="duotone" className="text-[var(--brick)]" aria-hidden="true" />
              <div>
                <p className="tech-sm tech text-[var(--ink-faint)]">Стоимость</p>
                <p className="num mt-1.5 text-sm font-extrabold">от 12 млн ₽</p>
              </div>
            </div>
            <div className="hero-fact flex items-center gap-3">
              <Timer size={22} weight="duotone" className="text-[var(--brick)]" aria-hidden="true" />
              <div>
                <p className="tech-sm tech text-[var(--ink-faint)]">Срок</p>
                <p className="num mt-1.5 text-sm font-extrabold">от 8 месяцев</p>
              </div>
            </div>
          </div>
        </div>

        <div data-hero-stage ref={stage} className="hero-stage">
          <div data-hero-sheet className="sheet">
            <span className="sheet__corner tech-sm" aria-hidden="true">мм</span>

            <div className="sheet__ruler-top" aria-hidden="true">
              <span data-hero-rule className="sheet__ruler-ticks" />
              <div className="sheet__ruler-marks">
                {topMarks.map((mark) => (
                  <span key={mark} className="sheet__mark tech-sm">{mark}</span>
                ))}
              </div>
            </div>

            <div className="sheet__ruler-left" aria-hidden="true">
              <span data-hero-rule-v className="sheet__ruler-ticks" />
              <div className="sheet__ruler-marks">
                {leftMarks.map((mark) => (
                  <span key={mark} className="sheet__mark tech-sm">{mark}</span>
                ))}
              </div>
            </div>

            <div className="sheet__canvas">
              <BlueprintMedia
                src="./images/hero-blueprint-house.png"
                alt="Кирпичный дом в переходе от архитектурного чертежа к готовому фасаду"
                sizes="(max-width: 1023px) 100vw, 58vw"
                priority
                motion="manual"
                ticks={false}
                className="hero-media h-full w-full"
                imageClassName="object-cover object-[58%_center]"
              >
                <div data-hero-dim className="dim dim--overlay hero-dim-h">
                  <span className="dim__bar" />
                  <span className="dim__val tech-sm">24 000 мм</span>
                </div>

                <div data-hero-dim className="dim-v dim-v--overlay hero-dim-v">
                  <span className="dim-v__bar" />
                  <span className="dim-v__val tech-sm">9 450 мм</span>
                </div>

                {callouts.map((callout) => (
                  <span
                    key={callout.label}
                    data-hero-callout
                    className="callout"
                    style={{ top: callout.top, left: callout.left }}
                  >
                    <span className="callout__dot" />
                    <span className="callout__leader" />
                    <span className="callout__label tech-sm">{callout.label}</span>
                  </span>
                ))}
              </BlueprintMedia>
            </div>

            <div data-hero-stamp className="sheet__stamp">
              <TitleBlock
                columns={6}
                cells={[
                  { key: "Объект", value: "Жилой дом, кирпич", span: 2 },
                  { key: "Стадия", value: "Рабочий проект" },
                  { key: "Масштаб", value: "1:100" },
                  { key: "Лист", value: "01", accent: true },
                  { key: "Листов", value: "13" }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
