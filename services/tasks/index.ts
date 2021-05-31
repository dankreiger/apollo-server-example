import express, { Request, Response } from 'express';
import cors from 'cors';

import { dbMiddleware } from './middleware/db';
import { ResLocals } from '../../types';
import { TaskApi } from './api';

const app = express();
// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

app.get(
  '/tasks',
  dbMiddleware,
  async (req: Request, res: Response<any, ResLocals>) => {
    const { db } = res.locals;
    const { tasks } = db.data || [];
    res.send(tasks);
  }
);

app.get(
  '/tasks/:id',
  dbMiddleware,
  async (req: Request, res: Response<any, ResLocals>) => {
    const { db } = res.locals;
    const task = db.data?.tasks.find(
      ({ id }: { id: any }) => id === req.params.id
    );
    res.send(task);
  }
);

app.post(
  '/tasks',
  dbMiddleware,
  async ({ body }: Request, res: Response<any, ResLocals>) => {
    const { db } = res.locals;
    const { tasks } = db.data;

    tasks.push(body);
    await db.write();

    res.send(tasks).end();
  }
);

app.get('/', (req: Request, res: Response) => {
  res.send('Rest Server');
});

app.listen(TaskApi.PORT, () => console.log(`\nServer: ${TaskApi.BASE}\n`));
