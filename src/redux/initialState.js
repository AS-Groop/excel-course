import {storages} from "../core/utilis";
import {defaultStyles, defaultTitle} from "../default";

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  cellState: {},
  applyStyles: {},
  currentStyles: defaultStyles,
  currentText: ''
}

const normalize = (state)=>({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = storages('excel-state')
  ? normalize(storages('excel-state'))
  : defaultState

