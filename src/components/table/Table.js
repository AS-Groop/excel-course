import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {resizeHandler} from "./table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "./table.function";
import {TableSelection} from "./TableSelection";
import {$} from "../../core/dom";
import * as actions from "../../redux/actions";
import {changeText} from "../../redux/actions";
import {defaultStyles} from "../../default";
import {parse} from "../../core/utilis";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, option) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...option
    })
    this.store = option.store
  }
  toHtml() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('Formula:input', (value)=>{
      const text = parse(value);
      this.selection.current
          .attr('data-value', value)
      this.selection.current
          .text(`${text}`);
      this.changeCellValue(value)
    })
    this.$on('Formula:done', ()=>{
      this.selection.current.focus()
    })
    this.$on('Toolbar:applyStyles', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyles({
        id: this.selection.selectionsId,
        value
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('Table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Table resize', e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const $target = $(event.target)
        const $current = this.selection.current
        this
            .selection
            .selectGroup(matrix($target, $current, this.$root))
      } else {
        const $cell = this.$root.find(`[data-id="${event.target.dataset.id}"]`)
        this.selectCell($cell)
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

  changeCellValue(value) {
    this.$dispatch(changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.$emit('Table:input', $(event.target))
    this.changeCellValue($(event.target).text())
  }
}


