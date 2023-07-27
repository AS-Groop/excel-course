import {defaultStyles} from "../default";

export function capitalize(name) {
  if (typeof name !== 'string') {
    return ''
  }
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function range(start, end) {
  if (end < start) {
    [start, end] = [end, start]
  }
  return new Array(end-start+1)
      .fill('')
      .map((_, index)=> start + index)
}

export function storages(key, data=null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b==='object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelCaseToDash(str) {
  return str.replace(/[A-Z]/g, g=> `-${g[0].toLowerCase()}`)
}

export function stylesToStr(styles={}) {
  return Object.keys(styles)
      .map(s=>`${camelCaseToDash(s)}: ${styles[s]}`)
      .join('; ')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = ()=> {
      clearTimeout(timeout)
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function parse(value) {
  if (value[0]==='=') {
    try {
      return eval(value.slice(1))
    } catch (e) {
      if (e instanceof SyntaxError) {
        return value
      }
      console.log(e)
    }
  }
  return value
}
