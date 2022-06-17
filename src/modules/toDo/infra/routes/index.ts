import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { CreateListControllerFactory } from '@modules/toDo/factories/controllers/CreateListControllerFactory';
import { UpdateListControllerFactory } from '@modules/toDo/factories/controllers/UpdateListControllerFactory';
import { DeleteListControllerFactory } from '@modules/toDo/factories/controllers/DeleteListControllerFactory';
import { GetListByIdControllerFactory } from '@modules/toDo/factories/controllers/GetListByIdControllerFactory';
import { GetAllListsControllerFactory } from '@modules/toDo/factories/controllers/GetAllListsControllerFactory';
import { ChangeListTitleControllerFactory } from '@modules/toDo/factories/controllers/ChangeListTitleController';
import { ChangeListDescriptionControllerFactory } from '@modules/toDo/factories/controllers/ChangeListDescriptionController';
import { ChangeListIsActiveControllerFactory } from '@modules/toDo/factories/controllers/ChangeListIsActiveController';
import { CreateItemControllerFactory } from '@modules/toDo/factories/controllers/Item/CreateItemController';
import { GetAllItemsControllerFactory } from '@modules/toDo/factories/controllers/Item/GetAllItemsController';
import { GetItemByIdControllerFactory } from '@modules/toDo/factories/controllers/Item/GetItemByIdControllerFactory';

const toDoRouter = express.Router();

toDoRouter.post('/list', adaptRoute(CreateListControllerFactory()));
toDoRouter.get('/list', adaptRoute(GetAllListsControllerFactory()));
toDoRouter.get('/list/:id', adaptRoute(GetListByIdControllerFactory()));
toDoRouter.put('/list/:id', adaptRoute(UpdateListControllerFactory()));
toDoRouter.put(
  '/list/:id/title',
  adaptRoute(ChangeListTitleControllerFactory()),
);
toDoRouter.put(
  '/list/:id/description',
  adaptRoute(ChangeListDescriptionControllerFactory()),
);
toDoRouter.put(
  '/list/:id/active',
  adaptRoute(ChangeListIsActiveControllerFactory()),
);
toDoRouter.delete('/list/:id', adaptRoute(DeleteListControllerFactory()));

toDoRouter.post('/item/:listId', adaptRoute(CreateItemControllerFactory()));
toDoRouter.get('/item/:listId', adaptRoute(GetAllItemsControllerFactory()));
toDoRouter.get('/item/:listId/:id', adaptRoute(GetItemByIdControllerFactory()));

export { toDoRouter };
