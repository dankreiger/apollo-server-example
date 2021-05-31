import { Request, Response, NextFunction } from 'express';
import { Db, DbFile } from '../../../types';

export const dbMiddleware = async (
  _: Request,
  { locals }: Response,
  next: NextFunction
) => {
  const adapter = new DbFile('./db.json');
  const db = new Db(adapter);
  await db.read();

  db.data ||= { tasks: [] };
  locals.db = db;

  next();
};
