import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ITask, ISchema } from '../../../types';
import { lorem, datatype, date } from 'faker';

const generateData = (): ITask => ({
  id: uuidv4(),
  title: lorem.words(),
  description: lorem.sentence(),
  priority: datatype.number({ min: 1, max: 3, precision: 1 }) as 1 | 2 | 3,
  schedule_date: date.past(),
  due_date: date.future(),
  completed: datatype.boolean(),
});

const xs = Array(12).fill(1);
const data: ISchema = { tasks: xs.map(generateData) };

const stream = fs.createWriteStream('../db.json');
stream.once('open', () => {
  stream.write(JSON.stringify(data, null, 2));
  stream.end();
});
