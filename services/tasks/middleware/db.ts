import { Request, Response, NextFunction } from 'express';
import { Db, DbFile } from '../../../types';
import path from 'path';

export const dbMiddleware = async (
  _: Request,
  { locals }: Response,
  next: NextFunction
) => {
  const file = path.resolve(__dirname, '../db.json');
  const adapter = new DbFile(file);
  const db = new Db(adapter);
  await db.read();

  db.data ||= { tasks: [] };
  locals.db = db;

  next();
};
