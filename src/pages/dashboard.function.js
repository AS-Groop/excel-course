import {storages} from "../core/utilis";

function toHtml(key) {
  const model = storages(key);
  const id = key.split(':')[1]
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>${new Date(model.openedDate).toLocaleString()}</strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i=0; i<localStorage.length; i++) {
    if (localStorage.key(i).startsWith('excel:')) {
      keys.push(localStorage.key(i))
    }
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHtml).join('')}
    </ul>
  `
}
