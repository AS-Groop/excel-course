import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {$} from "../../core/dom";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });

    this.down = false
    this.clientX = null
  }
  toHtml() {
    return createTable(15)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const resizeType = event.target.dataset.resize
      const $resizer = $(event.target)
      const $parent = $resizer.closest("[data-type='resizeble']")
      const cords = $parent.cords()

      document.onmousemove = (e)=>{
        if (resizeType==='col') {
          const value = (e.pageX - cords.right)
          $parent.$el.style.width = cords.width + value + 'px'
        } else {
          const value = (e.pageY - cords.bottom)
          $parent.$el.style.height = cords.height + value + 'px'
        }
      }

      document.onmouseup = ()=>{
        document.onmousemove = null
      }
    }
  }
}
