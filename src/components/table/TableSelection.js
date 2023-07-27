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

  get selectionsId() {
    return this.group.map($el=>$el.id())
  }

  selectGroup(cells = []) {
    this.clear()
    this.group = cells
    this.active()
  }

  applyStyle(style) {
    this.group.forEach($el =>{
      $el.css(style)
    })
  }
}
