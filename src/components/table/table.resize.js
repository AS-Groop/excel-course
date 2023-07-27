import {$} from "../../core/dom";

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const resizeType = event.target.dataset.resize
    const $resizer = $(event.target)
    const $parent = $resizer.closest("[data-type='resizeble']")
    const cords = $parent.cords()
    let value;

    document.onmousemove = (e)=>{
      if (resizeType==='col') {
        const delta = (e.pageX - cords.right)
        value = cords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = (e.pageY - cords.bottom)
        value = cords.height + delta
        // console.log(delta, value)
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = (e)=>{
      document.onmousemove = null
      document.onmouseup = null
      $resizer.css({right: '0px'})
      $resizer.css({bottom: '0px'})
      if (resizeType === 'col') {
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el=>{
              el.style.width = value + 'px'
            })
      } else {
        $parent.css({height: value + 'px'})
      }
      resolve({
        value,
        resizeType,
        id: resizeType === 'col' ? $parent.data.col : $parent.data.row
      })
    }
  })
}
