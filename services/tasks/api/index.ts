import { RESTDataSource } from 'apollo-datasource-rest';
import { ITask } from '../../../types';
export class TaskApi extends RESTDataSource {
  static PORT = 3002;
  static BASE = `http://localhost:${TaskApi.PORT}/`;
  constructor() {
    super();
    this.baseURL = TaskApi.BASE;
  }

  // GET
  async getAllTasks() {
    return this.get(
      `tasks` // path
    );
  }

  async getTask(id: string) {
    return this.get(
      `tasks/${id}` // path
    );
  }

  // POST
  async postTask(task: ITask) {
    return this.post(
      `tasks`, // path
      task // request body
    );
  }

  // PUT
  async newTask(task: ITask) {
    return this.put(
      `tasks`, // path
      task // request body
    );
  }

  // PATCH
  async updateTask(task: ITask) {
    return this.patch(
      `tasks`, // path
      { id: task.id, task } // request body
    );
  }

  // DELETE
  async deleteTask(task: ITask) {
    return this.delete(
      `tasks/${task.id}` // path
    );
  }
}
