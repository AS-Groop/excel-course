import {createToolbar} from "./toolbar.template";
import {$} from "../../core/dom";
import {ExcelStateComponent} from "../../core/ExcelStateComponent";
import {defaultStyles} from "../../default";

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  storeChanged({currentStyles}) {
    this.setState(currentStyles)
  }

  toHtml() {
    return this.template
  }

  onClick(event) {
    const $el = $(event.target)
    if ($el.data.type === 'icon') {
      const value = JSON.parse($el.data.value)
      const key = Object.keys(value)[0]
      this.$emit('Toolbar:applyStyles', value)
      this.setState({[key]: value[key]})
    }
  }
}
