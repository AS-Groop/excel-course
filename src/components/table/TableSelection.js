import {$} from "../../core/dom";

export class TableSelection {
  constructor() {
    this.group = []
  }

  select($el, event) {
    this.clear()
    this.group.push($el)
    this.active()
    $el.focus()
    this.current = $el
  }

  active() {
    this.group.forEach(el=>el.addClass('selected'))
  }

  clear() {
    this.group.forEach(el=>el.removeClass('selected'))
    this.group = []
  }

  selectGroup(cells = []) {
    this.clear()
    this.group = cells
    this.active()
  }
}
