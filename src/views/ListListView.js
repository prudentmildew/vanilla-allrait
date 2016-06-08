import BaseView from './BaseView';
import {$ge, $gc, $on} from "../helpers";

export default class ListListView extends BaseView {

  constructor(controller) {
    super(controller);
  }

  render(lists, focus = false) {
    this.controller.app.container.innerHTML = `
      <input id="addList" type="text" placeholder="... list go!"> 
      <ul class="lists" id="lists"></ul>
    `;

    const inputAddList = $ge('addList');

    if(focus){
      inputAddList.focus();
    }

    /**
     * Safari triggers 'change' event twice - hence 'keyup'
     */
    $on(inputAddList, 'keyup', (e) => {
      if(e.keyCode === 13){
        this.controller.saveList(e.target.value);
      }
    });

    this.renderLists($ge('lists'), lists);

  }

  renderLists(container, lists) {
    let list = [];
    lists.map(l => {
      list.push(
        `<li>
            <a href="#/lists/${l.id}">${l.title}</a>
            <button class="deleteList" data-id="${l.id}">x</button>
        </li>`)
    });
    list = list.join('');
    container.innerHTML = list;

    Array.from($gc(container, 'deleteList')).map(element => {
      $on(element, 'click', () => {
        this.controller.deleteList(element.dataset.id)
      });
    });

  }

}
