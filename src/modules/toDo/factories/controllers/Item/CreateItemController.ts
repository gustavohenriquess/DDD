import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { CreateItemController } from '@modules/toDo/useCases/Item/CreateItem/CreateItemController';
import { CreateItemUseCase } from '@modules/toDo/useCases/Item/CreateItem/CreateItemUseCase';

export function CreateItemControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const createItemUseCase = new CreateItemUseCase(prismaItemRepository);

  return new CreateItemController(createItemUseCase);
}
