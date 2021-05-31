import { JSONFile, Low } from 'lowdb';
import { Task } from './generated/schema';

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: 1 | 2 | 3;
  due_date: Date;
  schedule_date: Date;
  completed: boolean;
}

export interface ISchema {
  tasks: ITask[];
}
export class Db extends Low<ISchema> {
  data: ISchema = this.data;
}

export class DbFile extends JSONFile<ISchema> {}

export interface ResLocals {
  db: Db;
}

export interface IGQLData {
  tasks: Task[];
}
