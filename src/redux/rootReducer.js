import {
  APPLY_STYLES,
  CHANGE_TEXT,
  CURRENT_STYLES, OPENED_DATE,
  TABLE_RESIZE,
  TABLE_TITLE
} from "./types";

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.resizeType === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, action)}
    case CHANGE_TEXT:
      field = 'cellState'
      return {
        ...state,
        currentText: action.data.value,
        cellState: value(state, field, action)
      }
    case CURRENT_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLES:
      field = 'applyStyles'
      val = state[field] || {}
      console.log(val, action.data)
      action.data.id.forEach(s=>{
        val[s] = {...val[s], ...action.data.value}
      })
      return {...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}}
    case TABLE_TITLE:
      return {...state, title: action.data}
    case OPENED_DATE:
      return {...state, openedDate: action.data}
    default:
      return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
