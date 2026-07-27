"use client";

import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { type ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

/**
 * Словарь входов вместо одной анимации на всё.
 * Атрибут data-draft выбирает, как элемент появляется:
 *
 *   text   — построчный вайп слева направо, «перо ведёт строку»
 *   media  — каркас растворяется, фотография проявляется слева направо
 *   dim    — прорисовка размерной линии с засечками и значением
 *   frame  — обводка рамки, затем содержимое
 *   rise   — мягкий подъём, только для второстепенного
 */
export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = root.current;

    if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {}, scope);
    const splits: SplitText[] = [];
    let cancelled = false;

    const build = () => {
      if (cancelled) {
        return;
      }

      context.add(() => {
        /* --- глобальный прогресс стройки: 0 наверху, 1 внизу --- */
        ScrollTrigger.create({
          trigger: scope,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => scope.style.setProperty("--build", self.progress.toFixed(3))
        });

        /* --- текст: построчный вайп --- */
        scope.querySelectorAll<HTMLElement>("[data-draft='text']").forEach((element) => {
          const split = new SplitText(element, { type: "lines", linesClass: "draft-line" });
          element.classList.add("draft-lines");
          splits.push(split);

          gsap.set(split.lines, { "--fill": "0%" });

          gsap.to(split.lines, {
            "--fill": "100%",
            duration: 0.95,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true }
          });
        });

        /* --- медиа: чертёж становится фотографией --- */
        scope.querySelectorAll<HTMLElement>("[data-draft='media']").forEach((frame) => {
          gsap.fromTo(
            frame,
            { "--wipe": "0%" },
            {
              "--wipe": "100%",
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: { trigger: frame, start: "top 82%", once: true },
              onStart: () => {
                frame.dataset.drawing = "true";
              },
              onComplete: () => {
                frame.dataset.drawn = "true";
                delete frame.dataset.drawing;
              }
            }
          );
        });

        /* --- размерные линии --- */
        scope.querySelectorAll<HTMLElement>("[data-draft='dim']").forEach((dimension) => {
          const bar = dimension.querySelector(".dim__bar, .dim-v__bar");
          const value = dimension.querySelector(".dim__val, .dim-v__val");
          const vertical = dimension.classList.contains("dim-v");

          gsap
            .timeline({ scrollTrigger: { trigger: dimension, start: "top 90%", once: true } })
            .fromTo(
              bar,
              vertical ? { scaleY: 0 } : { scaleX: 0 },
              vertical
                ? { scaleY: 1, duration: 0.85, ease: "power2.inOut" }
                : { scaleX: 1, duration: 0.85, ease: "power2.inOut" }
            )
            .to(dimension, { "--serif": 1, duration: 0.25 }, "-=0.2")
            .to(value, { opacity: 1, duration: 0.35 }, "-=0.15");
        });

        /* --- прорисовка любых SVG-линий --- */
        scope.querySelectorAll<SVGPathElement>("[data-draw]").forEach((path) => {
          gsap.fromTo(
            path,
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: path.closest("[data-draw-trigger]") ?? path, start: "top 88%", once: true }
            }
          );
        });

        /* --- второстепенное: мягкий подъём --- */
        scope.querySelectorAll<HTMLElement>("[data-draft='rise']").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 90%", once: true }
            }
          );
        });

        /* --- маршрут стройки --- */
        scope.querySelectorAll<HTMLElement>("[data-route-line]").forEach((line) => {
          gsap.to(line, {
            scaleY: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: line.parentElement, start: "top 74%", once: true }
          });
        });

        scope.querySelectorAll<HTMLElement>("[data-route-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 64%",
            once: true,
            onEnter: () => step.classList.add("is-active")
          });
        });

        /* --- параллакс изображений --- */
        scope.querySelectorAll<HTMLElement>("[data-image-parallax]").forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -4, scale: 1.16, transformOrigin: "center center" },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: image.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.55
              }
            }
          );
        });

        ScrollTrigger.refresh();
      });
    };

    /* Строки режутся только после загрузки шрифтов, иначе разбивка съедет. */
    if (document.fonts?.ready) {
      document.fonts.ready.then(build);
    } else {
      build();
    }

    return () => {
      cancelled = true;
      splits.forEach((split) => split.revert());
      context.revert();
    };
  }, []);

  return (
    <div ref={root} className="page-shell">
      {children}
    </div>
  );
}
