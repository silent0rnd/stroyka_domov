type DimensionProps = {
  /** Подпись на размерной линии, например «24 000 мм». */
  value: string;
  /** Куда прижата подпись. */
  align?: "center" | "start";
  className?: string;
};

/**
 * Горизонтальная размерная линия с выносными штрихами-засечками под 45°
 * (как на архитектурных чертежах) и значением на полке.
 * Прорисовывается из page-motion по атрибуту data-draft="dim".
 */
export function Dimension({ value, align = "center", className = "" }: DimensionProps) {
  return (
    <div className={`dim ${className}`} data-draft="dim" aria-hidden="true">
      <span className="dim__bar" />
      <span className={`dim__val tech-sm${align === "start" ? " dim__val--start" : ""}`}>{value}</span>
    </div>
  );
}

type VerticalDimensionProps = {
  value: string;
  className?: string;
};

/** Вертикальная размерная линия — для маршрута стройки и высотных отметок. */
export function DimensionVertical({ value, className = "" }: VerticalDimensionProps) {
  return (
    <div className={`dim-v ${className}`} data-draft="dim" aria-hidden="true">
      <span className="dim-v__bar" />
      <span className="dim-v__val tech-sm">{value}</span>
    </div>
  );
}
