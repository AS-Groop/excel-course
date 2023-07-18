import {ExcelComponent} from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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
    const $formula = this.$root.find('#formula');
    this.$on('Table:select', ($cell) => {
      $formula.text($cell.text())
    })
    this.$on('Table:input', ($cell)=>{
      $formula.text($cell.text())
    })
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    this.$emit('Formula:input', text)
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
