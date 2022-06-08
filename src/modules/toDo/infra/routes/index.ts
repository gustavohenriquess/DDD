import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { CreateListControllerFactory } from '@modules/toDo/factories/controllers/CreateListControllerFactory';
import { UpdateListControllerFactory } from '@modules/toDo/factories/controllers/UpdateListControllerFactory';

const toDoRouter = express.Router();

toDoRouter.post('/list', adaptRoute(CreateListControllerFactory()));
toDoRouter.put('/list/:id', adaptRoute(UpdateListControllerFactory()));

export { toDoRouter };
