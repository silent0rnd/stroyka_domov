"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(
    () => {
      if (prefersReducedMotion || !root.current) {
        return;
      }

      root.current.querySelectorAll<HTMLElement>("main > section:not(#top), [data-reveal-item]").forEach((element) => {
        gsap.fromTo(element, {
          autoAlpha: 0,
          y: 42
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true
          }
        });
      });

      root.current.querySelectorAll<HTMLElement>("[data-route-line]").forEach((line) => {
        gsap.to(line, {
          scaleY: 1,
          duration: 1.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top 72%",
            once: true
          }
        });
      });
    },
    { scope: root, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  return <div ref={root} className="page-shell">{children}</div>;
}
