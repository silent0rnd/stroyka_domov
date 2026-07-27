type DrawCheckProps = {
  size?: number;
  className?: string;
};

/** Галочка, которую page-motion прорисовывает по data-draw. */
export function DrawCheck({ size = 20, className = "" }: DrawCheckProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        data-draw
        d="M3.5 12.4 L9.4 18.2 L20.5 5.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}
