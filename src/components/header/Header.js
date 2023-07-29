import {ExcelComponent} from "../../core/ExcelComponent";
import {$} from "../../core/dom";
import {changeTitle} from "../../redux/actions";
import {debounce, removeStorage} from "../../core/utilis";
import {ActiveRoute} from "../../core/router/ActiveRoute";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHtml() {
    const title = this.store.getState().title || 'Excel'
    return `
      <input type="text" class="input" value="${title}" />  
      <div>  
        <div class="button" data-type="delete">
          <i class="material-icons" data-type="delete">delete</i>
        </div>
  
        <div class="button" data-type="exit">
          <i class="material-icons" data-type="exit">exit_to_app</i>
        </div>  
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()))
  }

  onClick(event) {
    const target = $(event.target)
    if (target.data.type === 'exit') {
      ActiveRoute.navigate('')
    } else if (target.data.type === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        removeStorage(this.storageName)
        ActiveRoute.navigate('')
      }
    }
  }
}
