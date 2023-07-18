import {range} from "../../core/utilis";

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}
export function matrix($target, $current, $root) {
  const target = $target.id(true)
  const current = $current.id(true)
  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc
        .push($root.find(`[data-id="${row}:${col}"]`)))
    return acc
  }, []);
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break;
    case 'ArrowLeft':
      col = col-1 < 0 ? MIN_VALUE : col-1
      break;
    case 'ArrowUp':
      row = row-1 < 0 ? MIN_VALUE : row-1
      break
  }

  return `[data-id="${row}:${col}"]`
}

