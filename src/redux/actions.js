import {
  APPLY_STYLES,
  CHANGE_TEXT,
  CURRENT_STYLES, OPENED_DATE,
  TABLE_RESIZE,
  TABLE_TITLE
} from "./types";

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}
export function changeStyles(data) {
  return {
    type: CURRENT_STYLES,
    data
  }
}

export function applyStyles(data) {
  return {
    type: APPLY_STYLES,
    data
  }
}

export function changeTitle(data) {
  return {
    type: TABLE_TITLE,
    data
  };
}

export function openedDate(data) {
  return {
    type: OPENED_DATE,
    data
  };
}
