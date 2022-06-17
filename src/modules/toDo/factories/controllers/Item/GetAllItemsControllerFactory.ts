import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { GetAllItemController } from '@modules/toDo/useCases/Item/GetAllItems/GetAllItemsController';
import { GetAllItemsUseCase } from '@modules/toDo/useCases/Item/GetAllItems/GetAllItemsUseCase';

export function GetAllItemsControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const getAllItemsUseCase = new GetAllItemsUseCase(prismaItemRepository);

  return new GetAllItemController(getAllItemsUseCase);
}
