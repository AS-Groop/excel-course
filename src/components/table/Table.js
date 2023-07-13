import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }
  toHtml() {
    return createTable(15)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log('Start resizing', event.target.dataset.resize)
    }
  }
}
