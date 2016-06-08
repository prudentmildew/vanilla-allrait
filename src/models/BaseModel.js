import {uuid} from '../helpers';

export default class BaseModel {

  constructor(title) {
    this.id = uuid();
    this.title = title;
    this.completed = false;
  }

}
