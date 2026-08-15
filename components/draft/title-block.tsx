import type { CSSProperties } from "react";

export type TitleBlockCell = {
  key: string;
  value: string;
  /** Сколько колонок сетки занимает ячейка. */
  span?: number;
  /** Выделить значение кирпичным цветом. */
  accent?: boolean;
};

type TitleBlockProps = {
  cells: TitleBlockCell[];
  /** Число колонок сетки штампа. */
  columns?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Штамп чертёжного листа. Собирается из ячеек «ключ / значение»,
 * переиспользуется в hero, карточках проектов, калькуляторе и подвале.
 */
export function TitleBlock({ cells, columns = 4, className = "", style }: TitleBlockProps) {
  return (
    <div
      className={`title-block ${className}`}
      style={{ "--tb-cols": columns, ...style } as CSSProperties}
    >
      {cells.map((cell) => (
        <div
          key={cell.key}
          className="title-block__cell"
          style={cell.span && cell.span > 1 ? ({ "--tb-span": cell.span } as CSSProperties) : undefined}
        >
          <span className="title-block__key">{cell.key}</span>
          <span className={`title-block__val${cell.accent ? " title-block__val--brick" : ""}`}>{cell.value}</span>
        </div>
      ))}
    </div>
  );
}
