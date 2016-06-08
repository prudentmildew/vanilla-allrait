import ListListView from "./views/ListListView";
import TaskListView from "./views/TaskListView";
import List from "./models/List";
import Task from "./models/Task";

export default class Controller {

  constructor(app) {
    this.modelManager = app.modelManager;
    this.app = app;
  }

  showIndex() {
    this.showLists(true);
  }

  showLists(focus = false) {
    const lists = this.modelManager.findAll(List);
    const view = new ListListView(this);
    view.render(lists, focus);
  }

  showTasks(listId, focus = true) {
    const tasks = this.modelManager.findAllByParent(Task, listId);
    const list = this.modelManager.find(List, listId);
    const view = new TaskListView(this);
    view.render(tasks, list, focus);
  }

  saveList(name) {
    const list = new List(name);
    this.modelManager.persist(list);
    this.showLists(true);
  }

  deleteList(id) {
    const list = this.modelManager.find(List, id);
    this.modelManager.remove(List, list.id);
    this.modelManager.removeByParentId(Task, list.id);
    this.showLists();
  }

  saveTask(title, parentId) {
    const task = new Task(title, parentId);
    this.modelManager.persist(task);
    this.showTasks(task.parentId, true);
  }

  deleteTask(id) {
    const task = this.modelManager.find(Task, id);
    const parentId = task.parentId;
    this.modelManager.remove(Task, task.id);
    this.showTasks(parentId, false);
  }

  toggleTaskComplete(id, completed) {
    const task = this.modelManager.find(Task, id);
    task.completed = completed;
    this.modelManager.update(task);
    this.showTasks(task.parentId, false);
  }

}
