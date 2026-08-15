"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { SectionHead } from "@/components/draft/section-head";
import { wallSpecs } from "@/data/site";
import { buildWall } from "@/lib/wall-layout";

gsap.registerPlugin(ScrollTrigger);

/* Раскладка детерминирована и считается один раз на модуль — так разметка
   на сервере и в браузере совпадает при статическом экспорте. */
const wall = buildWall();
const total = wall.bricks.length;

export function BrickWall() {
  const section = useRef<HTMLElement>(null);
  const laidCounter = useRef<HTMLSpanElement>(null);
  const heightCounter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = section.current;

    if (!scope) {
      return;
    }

    /* Показания счётчиков пишем в DOM напрямую: через состояние React
       это была бы перерисовка на каждый кадр прокрутки. */
    const showProgress = (progress: number) => {
      if (laidCounter.current) {
        laidCounter.current.textContent = String(Math.round(progress * total));
      }
      if (heightCounter.current) {
        const mm = Math.round((progress * wall.heightMm) / 75) * 75;
        heightCounter.current.textContent = mm.toLocaleString("ru-RU");
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showProgress(1);
      return;
    }

    const context = gsap.context(() => {}, scope);
    let cancelled = false;

    const build = () => {
      if (cancelled) {
        return;
      }

      context.add(() => {
      /* Кирпичи лежат в массиве в порядке кладки, поэтому обычного stagger хватает. */
      const layWall = () => {
        gsap.set("[data-brick]", { opacity: 0, xPercent: -28, rotate: -1.6 });
        gsap.set("[data-wall-course]", { bottom: "0%" });

        const timeline = gsap.timeline({ paused: true });

        timeline
          .to("[data-brick]", {
            opacity: 1,
            xPercent: 0,
            rotate: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: { each: 0.014, from: "start" }
          })
          .to(
            "[data-wall-course]",
            {
              bottom: "100%",
              duration: total * 0.014,
              /* линия идёт ступенями по рядам, а не плывёт */
              ease: `steps(${wall.rows})`
            },
            0
          );

        timeline.eventCallback("onUpdate", () => showProgress(timeline.progress()));

        return timeline;
      };

      const media = gsap.matchMedia();

      /* На широких экранах лист закрепляется и стена растёт по прокрутке.
         Триггер вешаем на готовый таймлайн: если создать его вместе с
         пустым таймлайном, ScrollTrigger запомнит нулевую длительность
         и прокрутка разойдётся с кладкой. */
      media.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          animation: layWall(),
          trigger: scope,
          start: "top top",
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1
        });
      });

      /* На узких экранах закрепление мешает — кладка проигрывается один раз. */
      media.add("(max-width: 1023px)", () => {
        const timeline = layWall();

        ScrollTrigger.create({
          trigger: scope,
          start: "top 65%",
          once: true,
          onEnter: () => timeline.play()
        });
      });
      });
    };

    /* Ждём шрифты, как и общая моторика: до их подмены переносы в тексте
       другие, высота секции меняется, и старт пина считается не по той вёрстке. */
    if (document.fonts?.ready) {
      document.fonts.ready.then(build);
    } else {
      build();
    }

    return () => {
      cancelled = true;
      context.revert();
    };
  }, []);

  return (
    <section
      id="masonry"
      ref={section}
      className="draft-sheet flex items-center px-4 py-20 sm:px-6 lg:min-h-[100svh] lg:px-10 lg:py-12"
    >
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Кладка стены</span>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div>
          <SectionHead
            sheet="А-04"
            kicker="Порядовка"
            title="Каждый ряд — по уровню и отвесу."
            lead="Кладку ведем с постоянным контролем геометрии: вертикаль, горизонталь, толщина шва. От этого зависит, как фасад будет выглядеть через двадцать лет."
            titleClassName="max-w-[12ch] text-[clamp(2rem,3.4vw,3.1rem)]"
            leadClassName="max-w-md text-[0.95rem] leading-6"
          />

          <dl className="wall-spec">
            {wallSpecs.map((spec) => (
              <div key={spec.key} className="wall-spec__row">
                <dt className="tech-sm tech text-[var(--ink-faint)]">{spec.key}</dt>
                <dd className="num wall-spec__value">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="wall-gauge">
            <div>
              <p className="tech-sm tech text-[var(--ink-faint)]">Уложено</p>
              <p className="num wall-gauge__value">
                <span ref={laidCounter}>0</span>
                <span className="wall-gauge__total"> / {total} шт.</span>
              </p>
            </div>
            <div>
              <p className="tech-sm tech text-[var(--ink-faint)]">Высота кладки</p>
              <p className="num wall-gauge__value">
                <span ref={heightCounter}>0</span>
                <span className="wall-gauge__total"> мм</span>
              </p>
            </div>
          </div>
        </div>

        <div className="wall-frame">
          <div className="wall" style={{ aspectRatio: String(wall.ratio) }}>
            {/* чертёж кладки: контуры всех кирпичей, рисуется один раз */}
            <svg className="wall__draft" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {wall.bricks.map((brick, index) => (
                <rect
                  key={index}
                  x={brick.x}
                  y={brick.y}
                  width={brick.width}
                  height={brick.height}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* заливки: анимируются только прозрачностью и сдвигом */}
            {wall.bricks.map((brick, index) => (
              <span
                key={index}
                data-brick
                className={`wall__brick${brick.soldier ? " wall__brick--soldier" : ""}`}
                style={{
                  left: `${brick.x}%`,
                  top: `${brick.y}%`,
                  width: `${brick.width}%`,
                  height: `${brick.height}%`,
                  ["--tone" as string]: brick.tone.toFixed(3)
                }}
              />
            ))}

            <span
              className="wall__opening"
              style={{
                left: `${wall.opening.x}%`,
                top: `${wall.opening.y}%`,
                width: `${wall.opening.width}%`,
                height: `${wall.opening.height}%`
              }}
              aria-hidden="true"
            >
              <span className="wall__opening-label tech-sm">Проем 1300×750</span>
            </span>

            <span data-wall-course className="wall__course" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
