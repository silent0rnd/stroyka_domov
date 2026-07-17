"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const card = useRef<HTMLElement>(null);

  const resetTilt = () => {
    card.current?.style.removeProperty("--tilt-x");
    card.current?.style.removeProperty("--tilt-y");
  };

  const updateTilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover)").matches || !card.current) {
      return;
    }

    const bounds = card.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.current.style.setProperty("--tilt-x", `${y * -5.5}deg`);
    card.current.style.setProperty("--tilt-y", `${x * 5.5}deg`);
  };

  return (
    <article
      ref={card}
      className={`tilt-card ${className}`}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
    >
      {children}
    </article>
  );
}
