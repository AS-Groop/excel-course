import {clone, storages} from "../core/utilis";
import {defaultStyles, defaultTitle} from "../default";

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  cellState: {},
  applyStyles: {},
  openedDate: new Date().toJSON(),
  currentStyles: defaultStyles,
  currentText: ''
}

const normalize = (state)=>({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = (state) => storages(state)
  ? normalize(storages(state))
  : clone(defaultState)

