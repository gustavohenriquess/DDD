import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { DeleteItemController } from '@modules/toDo/useCases/Item/DeleteItem/DeleteItemController';
import { DeleteItemUseCase } from '@modules/toDo/useCases/Item/DeleteItem/DeleteItemUseCase';

export function DeleteItemControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const deleteItemUseCase = new DeleteItemUseCase(prismaItemRepository);

  return new DeleteItemController(deleteItemUseCase);
}
