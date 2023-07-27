import {Excel} from "./components/excel/Excel";
import {Header} from "./components/header/Header";
import {Toolbar} from "./components/toolbar/Toolbar";
import {Formula} from "./components/formula/Formula";
import {Table} from "./components/table/Table";
import {createStore} from "./core/createStore";
import {rootReducer} from "./redux/rootReducer";
import './scss/index.scss'
import {debounce, storages} from "./core/utilis";
import {initialState} from "./redux/initialState";

const store = createStore(rootReducer, initialState)
const timeout = debounce(state=>{
  storages('excel-state', state)
  // console.log('App state', state)
}, 600)

store.subscribe(timeout)

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
