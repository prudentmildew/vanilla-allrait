import BaseView from './BaseView';
import {$ge, $gc, $gt, $on} from "../helpers";

export default class TaskListView extends BaseView {

  constructor(controller) {
    super(controller);
  }

  render(tasks, list, focus = false) {
    this.controller.app.container.innerHTML = `
        <input id="addTask" type="text" placeholder="${list.title}">
        <ul class="tasks" id="tasks"></ul>
    `;

    const inputAddTask = $ge('addTask');

    if(focus){
      inputAddTask.focus();
    }

    /**
     * Safari triggers 'change' event twice - hence 'keyup'
     */
    $on(inputAddTask, 'keyup', (e) => {
      if(e.keyCode === 13){
        this.controller.saveTask(e.target.value, list.id);
      }
    });

    this.renderTasks($ge('tasks'), tasks);

  }

  renderTasks(container, tasks) {
    let list = [];
    tasks.map(task => {
      const completed = task.completed ? 'completed' : '';
      const checked = task.completed ? 'checked' : '';
      list.push(`
        <li class="task ${completed}" data-id="${task.id}">
            <input class="completeTask" type="checkbox" value="complete" ${checked}>
            <span>${task.title}</span>
            <button class="deleteTask">x</button>
        </li>
      `)
    });
    list = list.join('');
    container.innerHTML = list;

    Array.from($gc(container, 'task')).map(element => {

      $on($gc(element, 'completeTask')[0], 'change', (e) => {
        this.controller.toggleTaskComplete(element.dataset.id, e.target.checked);
      });

      $on($gt(element, 'button')[0], 'click', () => {
        this.controller.deleteTask(element.dataset.id)
      });

    });

  }

}
