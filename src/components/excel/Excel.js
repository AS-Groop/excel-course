import {$} from "../../core/dom";
import {Emitter} from "../../core/Emitter";
import {StoreSubscriber} from "../../core/StoreSubscriber";
import {openedDate} from "../../redux/actions";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store
    this.storegeName = options.storageName
    this.subscriber = new StoreSubscriber(this.store)
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOption = {
      emitter: this.emitter,
      store: this.store,
      storageName: this.storegeName
    }

    this.components = this.components.map(Component=>{
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOption)
      $el.html(component.toHtml())
      $root.append($el)

      return component
    })

    return $root
  }

  init() {
    this.subscriber.subscriberStore(this.components)
    this.components.forEach(component=>{
      component.init()
    })
    this.store.dispatch(openedDate(new Date().toJSON()))
  }

  destroy() {
    this.subscriber.unsubscribeStore()
    this.components.forEach(component=>component.destroy())
  }
}
