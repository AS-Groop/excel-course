import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.emitter = options.emitter;
    this.unsubs = []
    this.prepare();
  }

  toHtml() {
    return ""
  }

  $emit(key, ...value) {
    this.emitter.emit(key, ...value)
  }

  $on(key, fn) {
    const unsub = this.emitter.subscribe(key, fn)
    this.unsubs.push(unsub)
  }

  prepare() {}

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub=>unsub())
  }
}
