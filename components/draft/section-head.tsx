import type { ReactNode } from "react";
import { Dimension } from "@/components/draft/dimension";

type SectionHeadProps = {
  /** Код листа, например «А-04». */
  sheet: string;
  /** Надпись рядом с кодом листа. */
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Значение на размерной линии под заголовком. */
  dim?: string;
  className?: string;
  /** Ширина и кегль заголовка, задаются целиком. В шаблоне их нет: две одинаковые
   *  утилиты кегля конфликтуют, и побеждает не та, что позже в className,
   *  а та, что позже в собранном CSS. */
  titleClassName?: string;
  leadClassName?: string;
};

/**
 * Единая шапка секции: код листа, заголовок с построчным раскрытием
 * и размерная линия, «измеряющая» заголовок.
 */
export function SectionHead({
  sheet,
  kicker,
  title,
  lead,
  dim,
  className = "",
  titleClassName = "max-w-[42rem] text-[clamp(2rem,4.2vw,3.7rem)]",
  leadClassName = ""
}: SectionHeadProps) {
  return (
    <header className={className}>
      <p className="sheet-head__meta tech">
        <span className="sheet-head__code">{sheet}</span>
        <span className="sheet-head__rule" aria-hidden="true" />
        <span>{kicker}</span>
      </p>
      <h2
        data-draft="text"
        className={`mt-6 font-extrabold leading-[1.02] tracking-[-0.06em] text-[var(--graphite)] ${titleClassName}`}
      >
        {title}
      </h2>
      {dim ? <Dimension value={dim} align="start" className="mt-5 max-w-[22rem]" /> : null}
      {lead ? (
        <p
          data-draft="text"
          className={`mt-5 text-[0.98rem] leading-7 text-[var(--ink-soft)] ${leadClassName}`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
