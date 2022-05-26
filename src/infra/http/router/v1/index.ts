import { toDoRouter } from '@modules/toDo/infra/routes';
import express from 'express';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  res.send('v1');
});

v1Router.use('/', toDoRouter);

export { v1Router };
