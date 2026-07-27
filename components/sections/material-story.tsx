"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { BlueprintMedia } from "@/components/draft/blueprint-media";
import { Icon } from "@/components/ui/icon";
import { materialReasons } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/** Число кирпичных рядов, которыми набирается фасад. */
const courses = 16;

export function MaterialStory() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".material-media", { "--wipe": "100%" });
        gsap.set("[data-material-reason]", { autoAlpha: 1, x: 0 });
        return;
      }

      const layCourses = (timeline: gsap.core.Timeline) => {
        /* 0% — каркас закрывает кадр целиком, 100% — фасад выложен до верха */
        gsap.set(".material-media", { "--wipe": "0%" });
        gsap.set("[data-material-reason]", { autoAlpha: 0.18, x: -14 });

        return timeline
          .to(".material-media", {
            "--wipe": "100%",
            duration: 2,
            /* ступени — кладка ложится рядами, а не плывёт */
            ease: `steps(${courses})`,
            /* data-drawn здесь не ставим: таймлайн привязан к скроллу
               и должен так же отыгрываться назад при движении вверх */
            onStart: () => document.querySelector(".material-media")?.setAttribute("data-drawing", "true"),
            onComplete: () => document.querySelector(".material-media")?.removeAttribute("data-drawing")
          })
          .to("[data-material-reason]", { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.28 }, "<0.25");
      };

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        layCourses(
          gsap.timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: "+=95%",
              pin: true,
              pinSpacing: true,
              scrub: 0.55,
              anticipatePin: 1
            }
          })
        );
      });

      media.add("(max-width: 1023px)", () => {
        layCourses(
          gsap.timeline({
            scrollTrigger: { trigger: section.current, start: "top 62%", once: true }
          })
        );
      });
    },
    { scope: section, revertOnUpdate: true }
  );

  return (
    <section
      ref={section}
      className="draft-sheet flex items-center px-4 py-20 sm:px-6 lg:min-h-[100svh] lg:px-10 lg:py-12"
    >
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">Смысл материала</span>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <div className="material-frame">
          <BlueprintMedia
            src="./images/project-courtyard.png"
            alt="Архитектурное решение кирпичного дома с внутренним двором"
            sizes="(max-width: 1023px) 100vw, 48vw"
            motion="manual"
            reveal="courses"
            className="material-media min-h-[380px] lg:h-[64svh] lg:min-h-[420px]"
          >
            <span className="material-course-tag tech-sm">
              Кладка · {courses} рядов
            </span>
          </BlueprintMedia>
        </div>

        <div>
          <p className="sheet-head__meta tech">
            <span className="sheet-head__code">А-03</span>
            <span className="sheet-head__rule" aria-hidden="true" />
            <span>Смысл материала</span>
          </p>

          <h2
            data-draft="text"
            className="mt-5 max-w-[11ch] text-[clamp(2rem,3.4vw,3.1rem)] font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)]"
          >
            Кирпич дает дому ощущение опоры.
          </h2>

          <p data-draft="text" className="mt-4 max-w-lg text-[0.95rem] leading-6 text-[var(--ink-soft)]">
            Это не только про фасад. Материал помогает собрать спокойное, теплое и выразительное пространство для семьи.
          </p>

          <ol className="mt-6 grid gap-0">
            {materialReasons.map((reason, index) => (
              <li key={reason.title} data-material-reason className="material-reason">
                <span className="material-reason__index num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[0.95rem] font-extrabold text-[var(--graphite)]">{reason.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{reason.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <a href="#projects" className="button-secondary mt-7">
            Посмотреть варианты
            <Icon name="arrow-right" size={17} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
}
