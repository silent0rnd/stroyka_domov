/**
 * Раскладка фрагмента фасада в ложковой перевязке.
 *
 * Модуль реальный: кирпич 250×65 мм, шов 10 мм — ячейка 260×75 мм.
 * Нечётные ряды сдвинуты на полкирпича, по краям встают половинки.
 * Из сетки вырезан оконный проём, над ним — рядовая перемычка кирпичом на ребро.
 *
 * Раскладка считается один раз на уровне модуля и обязана быть детерминированной:
 * сайт собирается статически, и любая случайность здесь разошлась бы при гидратации.
 */

export type Brick = {
  /** Левый край в процентах ширины стены. */
  x: number;
  /** Верхний край в процентах высоты стены. */
  y: number;
  width: number;
  height: number;
  /** Ряд снизу вверх, 0 — нижний. */
  row: number;
  /** Разброс тона 0…1 — чтобы кладка не выглядела плоской заливкой. */
  tone: number;
  /** Кирпич поставлен на ребро (перемычка над проёмом). */
  soldier: boolean;
};

export type WallLayout = {
  bricks: Brick[];
  columns: number;
  rows: number;
  /** Пропорция стены для aspect-ratio. */
  ratio: number;
  opening: { x: number; y: number; width: number; height: number };
  /** Высота кладки в миллиметрах — для размерной линии. */
  heightMm: number;
};

const COLUMNS = 12;
const ROWS = 22;

/** Оконный проём: колонки [from, to) и ряды снизу. */
const OPENING = { colFrom: 6, colTo: 11, rowFrom: 7, rowTo: 17 };

/**
 * Детерминированный разброс тона: тот же индекс — тот же результат
 * и на сервере, и в браузере.
 */
function toneFor(row: number, column: number): number {
  const hash = Math.sin(row * 12.9898 + column * 78.233) * 43758.5453;
  return hash - Math.floor(hash);
}

export function buildWall(): WallLayout {
  const bricks: Brick[] = [];
  const cellWidth = 100 / COLUMNS;
  const cellHeight = 100 / ROWS;
  /* Ряд перемычки — сразу над проёмом. */
  const lintelRow = OPENING.rowTo;

  for (let row = 0; row < ROWS; row += 1) {
    const y = 100 - (row + 1) * cellHeight;

    if (row === lintelRow) {
      /* Перемычка: над проёмом кирпичи поставлены на ребро. */
      const quarters = (OPENING.colTo - OPENING.colFrom) * 4;

      for (let quarter = 0; quarter < quarters; quarter += 1) {
        bricks.push({
          x: (OPENING.colFrom + quarter / 4) * cellWidth,
          y,
          width: cellWidth / 4,
          height: cellHeight,
          row,
          tone: toneFor(row, quarter),
          soldier: true
        });
      }
    }

    /* Ряды проёма и ряд перемычки прерываются на ширине окна. */
    const blocked = row >= OPENING.rowFrom && row <= lintelRow;

    /* Нечётные ряды сдвинуты на полкирпича — отсюда половинки по краям. */
    const shifted = row % 2 === 1;
    let cell = 0;

    while (cell < COLUMNS) {
      const isEdgeHalf = shifted && (cell === 0 || cell + 1 >= COLUMNS);
      const nextCell = cell + (isEdgeHalf ? 0.5 : 1);
      let start = cell;
      let end = nextCell;

      if (blocked && end > OPENING.colFrom && start < OPENING.colTo) {
        if (start >= OPENING.colFrom && end <= OPENING.colTo) {
          /* целиком в проёме — кирпича здесь нет */
          cell = nextCell;
          continue;
        }

        /* задевает откос — подрезаем по нему, как кладут в жизни */
        if (start < OPENING.colFrom) {
          end = OPENING.colFrom;
        } else {
          start = OPENING.colTo;
        }
      }

      bricks.push({
        x: start * cellWidth,
        y,
        width: (end - start) * cellWidth,
        height: cellHeight,
        row,
        tone: toneFor(row, cell),
        soldier: false
      });

      cell = nextCell;
    }
  }

  /* Порядок укладки: снизу вверх, каждый ряд слева направо. */
  bricks.sort((a, b) => (a.row === b.row ? a.x - b.x : a.row - b.row));

  return {
    bricks,
    columns: COLUMNS,
    rows: ROWS,
    ratio: (COLUMNS * 260) / (ROWS * 75),
    opening: {
      x: OPENING.colFrom * cellWidth,
      y: 100 - OPENING.rowTo * cellHeight,
      width: (OPENING.colTo - OPENING.colFrom) * cellWidth,
      height: (OPENING.rowTo - OPENING.rowFrom) * cellHeight
    },
    heightMm: ROWS * 75
  };
}
