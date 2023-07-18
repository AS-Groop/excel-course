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
