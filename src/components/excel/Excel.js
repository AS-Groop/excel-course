import {$} from "../../core/dom";
import {Emitter} from "../../core/Emitter";
import {StoreSubscriber} from "../../core/StoreSubscriber";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOption = {
      emitter: this.emitter,
      store: this.store
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

  render() {
    this.$el.append(this.getRoot().$el);
    this.subscriber.subscriberStore(this.components)
    this.components.forEach(component=>{
      component.init()
    })
  }

  destroy() {
    this.subscriber.unsubscribeStore()
    this.components.forEach(component=>component.destroy())
  }
}
