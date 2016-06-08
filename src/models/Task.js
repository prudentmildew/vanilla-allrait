import BaseModel from './BaseModel';

export default class Task extends BaseModel {

  constructor(title, parentId) {
    super(title);
    this.parentId = parentId;
  }

}
