import {$} from "../dom";
import {ActiveRoute} from "./ActiveRoute";

export class Router {
  constructor(selector, routers) {
    if (!selector) {
      throw new Error('Selector not found')
    }
    this.$placeholder = $(selector)
    this.routers = routers
    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
    this.page.afterRender()
  }

  changePageHandler() {
    this.$placeholder.clear()
    if (this.page) {
      this.page.destroy()
    }
    const Page = ActiveRoute.path.includes('excel')
        ? this.routers.excel
        : this.routers.dashboard
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
    this.page.destroy()
  }
}

