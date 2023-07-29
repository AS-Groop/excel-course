import {DomListener} from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store
    this.storageName = options.storageName
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  prepare() {}

  storeChanged() {}

  watchStore(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub());
  }
}
