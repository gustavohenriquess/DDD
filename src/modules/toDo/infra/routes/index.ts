import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { CreateListControllerFactory } from '@modules/toDo/factories/controllers/CreateListControllerFactory';
import { UpdateListControllerFactory } from '@modules/toDo/factories/controllers/UpdateListControllerFactory';
import { DeleteListControllerFactory } from '@modules/toDo/factories/controllers/DeleteListControllerFactory';
import { GetListByIdControllerFactory } from '@modules/toDo/factories/controllers/GetListByIdControllerFactory';
import { GetAllListsControllerFactory } from '@modules/toDo/factories/controllers/GetAllListsControllerFactory';

const toDoRouter = express.Router();

toDoRouter.post('/list', adaptRoute(CreateListControllerFactory()));
toDoRouter.get('/list', adaptRoute(GetAllListsControllerFactory()));
toDoRouter.get('/list/:id', adaptRoute(GetListByIdControllerFactory()));
toDoRouter.put('/list/:id', adaptRoute(UpdateListControllerFactory()));
toDoRouter.delete('/list/:id', adaptRoute(DeleteListControllerFactory()));
export { toDoRouter };
