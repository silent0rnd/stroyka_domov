import type { ReactNode } from "react";

type SheetFrameProps = {
  /** Название листа в вертикальном поле слева. */
  label: string;
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Обрамление секции как чертёжного листа: вертикальное поле слева
 * с названием листа. Поле появляется только на широких экранах —
 * код листа всегда показывает SectionHead.
 */
export function SheetFrame({ label, id, className = "", children }: SheetFrameProps) {
  return (
    <section id={id} className={`draft-sheet ${className}`}>
      <div className="sheet-gutter" aria-hidden="true">
        <span className="sheet-code tech-sm">{label}</span>
      </div>
      {children}
    </section>
  );
}
