"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { DrawCheck } from "@/components/draft/draw-check";
import { SectionHead } from "@/components/draft/section-head";
import { constructionSteps } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export function ConstructionRoute() {
  const section = useRef<HTMLElement>(null);
  const [reached, setReached] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setReached(constructionSteps.length);
        return;
      }

      /* Счётчик этапов в липкой панели идёт вместе с прокруткой списка. */
      gsap.utils.toArray<HTMLElement>("[data-route-step]").forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 64%",
          onEnter: () => setReached(index + 1),
          onLeaveBack: () => setReached(index)
        });
      });
    },
    { scope: section, revertOnUpdate: true }
  );

  return (
    <section id="process" ref={section} className="draft-sheet section-rule px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Маршрут строительства</span>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            sheet="А-07"
            kicker="Этапность работ"
            title="Строим по маршруту, который видно целиком."
            lead="От первой встречи до передачи дома каждый этап имеет свою задачу и понятный результат."
            titleClassName="max-w-[10ch]"
            leadClassName="max-w-md"
          />

          <div className="route-gauge">
            <span className="tech-sm tech text-[var(--ink-faint)]">Этап</span>
            <span className="route-gauge__value num">
              {String(Math.max(reached, 1)).padStart(2, "0")}
              <span className="route-gauge__total"> / {String(constructionSteps.length).padStart(2, "0")}</span>
            </span>
            <span className="route-gauge__track" aria-hidden="true">
              <span
                className="route-gauge__fill"
                style={{ transform: `scaleX(${reached / constructionSteps.length})` }}
              />
            </span>
          </div>
        </div>

        <ol className="relative grid gap-1">
          {constructionSteps.map((step, index) => (
            <li key={step.title} data-route-step className="route-step relative flex gap-5 py-5">
              {index < constructionSteps.length - 1 ? (
                <span className="absolute bottom-[-1.5rem] left-[1.12rem] top-14 w-px bg-[var(--line)]" aria-hidden="true">
                  <span data-route-line className="route-line block h-full w-full bg-[var(--brick)]" />
                </span>
              ) : null}

              <span className="route-marker" aria-hidden="true">
                <DrawCheck size={15} />
              </span>

              <div className="route-body">
                <div className="flex items-baseline gap-3">
                  <span className="num route-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-extrabold tracking-[-0.035em] text-[var(--graphite)]">{step.title}</h3>
                </div>
                <p className="route-result mt-2 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{step.result}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
