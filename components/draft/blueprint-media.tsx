"use client";

import Image from "next/image";
import { type PointerEvent, type ReactNode, useRef } from "react";

type BlueprintMediaProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Медленный параллакс по скроллу вместо зума при наведении. */
  parallax?: boolean;
  /** Угловые приводочные засечки поверх кадра. */
  ticks?: boolean;
  /** Классы обёртки: пропорции, скругление, минимальная высота. */
  className?: string;
  imageClassName?: string;
  /** Выноски, метки и подписи поверх изображения. */
  children?: ReactNode;
  /**
   * auto — вайп запускает page-motion при попадании в экран.
   * manual — вайпом управляет родительская секция (hero, блок материала).
   */
  motion?: "auto" | "manual";
};

/**
 * Изображение, которое рождается из чертежа: сначала каркасный слой
 * (обесцвеченное фото под сеткой), затем вайп слева направо превращает
 * его в фотографию. Под курсором локально проступает сетка чертёжной доски.
 *
 * Вайп запускает page-motion по атрибуту data-draft="media".
 */
export function BlueprintMedia({
  src,
  alt,
  sizes,
  priority,
  parallax,
  ticks = true,
  className = "",
  imageClassName = "object-cover",
  children,
  motion = "auto"
}: BlueprintMediaProps) {
  const frame = useRef<HTMLDivElement>(null);

  const trackPointer = (event: PointerEvent<HTMLDivElement>) => {
    const node = frame.current;

    if (!node || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover)").matches) {
      return;
    }

    const bounds = node.getBoundingClientRect();
    node.style.setProperty("--px", `${event.clientX - bounds.left}px`);
    node.style.setProperty("--py", `${event.clientY - bounds.top}px`);
    node.style.setProperty("--lens", "1");
  };

  const releasePointer = () => {
    frame.current?.style.setProperty("--lens", "0");
  };

  return (
    <div
      ref={frame}
      data-draft={motion === "auto" ? "media" : undefined}
      data-bp-media=""
      className={`bp-media ${ticks ? "corner-ticks" : ""} ${className}`}
      onPointerMove={trackPointer}
      onPointerLeave={releasePointer}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        data-image-parallax={parallax ? true : undefined}
        className={imageClassName}
      />
      <span className="bp-media__wire" aria-hidden="true">
        <Image src={src} alt="" fill sizes={sizes} className={`bp-media__ghost ${imageClassName}`} />
      </span>
      <span className="bp-media__edge" aria-hidden="true" />
      <span className="bp-media__lens" aria-hidden="true" />
      <span className="bp-media__cross" aria-hidden="true" />
      {children}
    </div>
  );
}
