import {ExcelComponent} from "../../core/ExcelComponent";
import {$} from "../../core/dom";
// import {$} from "../../core/dom";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText', 'colState'],
      ...options
    });
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula');
    this.$on('Table:select', ($cell) => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('Formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab'
    ]
    const {key} = event

    if (keys.includes(key)) {
      event.preventDefault()
      this.$emit('Formula:done')
    }
  }
}
