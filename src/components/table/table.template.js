const CODE = {
  A: 65,
  Z: 90
}

function toCol(col) {
  return `
    <div class="column">${col}</div>
  `
}

function toCell() {
  return `<div class="cell" contenteditable></div>`
}


function createRow(content, count) {
  return `
    <div class="row">
      <div class="row-info">${count || ' '}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount) {
  const colsCount = CODE.Z - CODE.A + 1;
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toCol)
      .join('')

  rows.push(createRow(cols))

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1))
  }
  return rows.join('')
}
