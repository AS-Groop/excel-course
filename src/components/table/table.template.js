import {defaultStyles} from "../../default";
import {camelCaseToDash, parse, stylesToStr} from "../../core/utilis";

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const CODE = {
  A: 65,
  Z: 90
}

function getWidth(index, colState) {
  return (colState[index] || DEFAULT_WIDTH)+'px'
}

function toCol({col, index, width}) {
  return `
    <div 
      class="column" 
      data-col="${index}" 
      style="width: ${width}"
      data-type='resizeble'
      >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toCell(row, state) {
  return function(_, col) {
    const width = getWidth(col, state.colState);
    const id = row+':'+col
    const styles = stylesToStr(state.applyStyles[id])
    const value = state.cellState[id]||''
    return `
      <div 
        class="cell" 
        data-type="cell"
        data-col="${col}" 
        data-id="${id}" 
        data-value="${value || ''}"
        contenteditable
        style="width: ${width}; ${styles}"
      >
        ${parse(value) || ""}
      </div>`
  }
}

function widthWidthFrom(state) {
  return (col, index)=> {
    return {col, index, width: getWidth(index, state.colState)}
  }
}

function getHeight(index, state) {
  return (state ? state[index]|| DEFAULT_HEIGHT : DEFAULT_HEIGHT)+'px'
}


function createRow(content, index, state) {
  const height = getHeight(index, state.rowState)
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
    <div 
    class="row"
    data-type='resizeble'
    data-row="${index || 0}"
    style="height: ${height}"
    >
      <div class="row-info">
        ${index || ' '}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount, state = {}) {
  const colsCount = CODE.Z - CODE.A + 1;
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widthWidthFrom(state))
      .map(toCol)
      .join('')

  rows.push(createRow(cols, 0, {}))


  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(i, state))
        .join('')

    rows.push(createRow(cells, i + 1, state))
  }
  return rows.join('')
}
