import BaseView from './BaseView';

export default class IndexView extends BaseView {

  constructor(controller) {
    super(controller);
  }

  render() {
    this.controller.app.container.innerHTML = `
      <a href="#/lists">... let's go!</a>
    `;
  }

}
