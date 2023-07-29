import {Page} from "../Page";
import {createStore} from "../core/createStore";
import {rootReducer} from "../redux/rootReducer";
import {debounce, storages} from "../core/utilis";
import {Excel} from "../components/excel/Excel";
import {Header} from "../components/header/Header";
import {Toolbar} from "../components/toolbar/Toolbar";
import {Formula} from "../components/formula/Formula";
import {Table} from "../components/table/Table";
import {initialState} from "../redux/initialState";

function storageName(params) {
  return `excel:`+params
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now()
    const name = storageName(params)
    const store = createStore(rootReducer, initialState(name))
    const timeout = debounce(state=>{
      storages(name, state)
      // console.log('App state', state)
    }, 600)

    store.subscribe(timeout)

    this.excel = new Excel("#app", {
      components: [Header, Toolbar, Formula, Table],
      store,
      storageName: name
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
