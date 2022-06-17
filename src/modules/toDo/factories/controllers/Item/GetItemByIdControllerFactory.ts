import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { GetItemByIdController } from '@modules/toDo/useCases/Item/GetItemById/GetItemByIdController';
import { GetItemByIdUseCase } from '@modules/toDo/useCases/Item/GetItemById/GetItemByIdUseCase';

export function GetItemByIdControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const getAllItemsUseCase = new GetItemByIdUseCase(prismaItemRepository);

  return new GetItemByIdController(getAllItemsUseCase);
}
