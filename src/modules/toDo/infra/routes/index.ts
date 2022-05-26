import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { CreateListControllerFactory } from '@modules/toDo/factories/controllers';

const toDoRouter = express.Router();

toDoRouter.post('/list', adaptRoute(CreateListControllerFactory()));

export { toDoRouter };
