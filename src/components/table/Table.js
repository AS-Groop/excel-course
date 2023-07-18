import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {resizeHandler} from "./table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "./table.function";
import {TableSelection} from "./TableSelection";
import {$} from "../../core/dom";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, option) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...option
    })
  }
  toHtml() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('Formula:input', (text)=>{
      this.selection.current.text(text);
    })
    this.$on('Formula:done', ()=>{
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('Table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const $target = $(event.target)
        const $current = this.selection.current
        this
            .selection
            .selectGroup(matrix($target, $current, this.$root))
      } else {
        const $cell = this.$root.find(`[data-id="${event.target.dataset.id}"]`)
        this.selection.select($cell, event)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      this.selectCell(this.$root.find(nextSelector(key, id)))
    }
  }

  onInput(event) {
    this.$emit('Table:input', $(event.target))
  }
}


