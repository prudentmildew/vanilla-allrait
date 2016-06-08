import {$trigger, $on} from './helpers';

export default class Router {

  constructor(controller) {
    this.controller = controller;
    $on(window, 'hashchange', () => {
      this.match(document.location.hash);
    });
    $on(window, 'load', $trigger('hashchange'));
  }

  match(hash) {
    const hashInfo = hash.split('/');
    const route = hashInfo[1] || 'index';
    const listId = hashInfo[2] || null;

    switch (route) {
      case 'lists':
        if (listId === null) {
          this.controller.showLists();
        } else {
          this.controller.showTasks(listId);
        }
        break;
      case 'index':
        this.controller.showIndex();
        break;
      default:
    }
  }

}
