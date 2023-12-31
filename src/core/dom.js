class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (html) {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text.trim()
      return this
    }

    if (this.$el.tagName.toLowerCase()==='input') {
      return this.$el.value.trim()
    }

    return this.$el.textContent.trim()
  }

  clear() {
    this.$el.innerHTML = ''
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  get data() {
    return this.$el.dataset
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key=>{
          this.$el.style[key] = styles[key]
        })
  }

  getStyles(styles = []) {
    return styles.reduce((res, s)=>{
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  focus() {
    this.$el.focus()
    return this
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  id(parse) {
    if (parse) {
      const parser = this.id().split(':')
      return {
        row: +parser[0],
        col: +parser[1]
      }
    }
    return this.data.id
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  cords() {
    return this.$el.getBoundingClientRect()
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '')=>{
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}
