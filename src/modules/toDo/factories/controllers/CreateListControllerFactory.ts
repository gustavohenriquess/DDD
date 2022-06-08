import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { CreateListController } from '@modules/toDo/useCases/CreateList/CreateListController';
import { CreateListUseCase } from '@modules/toDo/useCases/CreateList/CreateListUseCase';

export function CreateListControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const createListUseCase = new CreateListUseCase(prismaListRepository);

  return new CreateListController(createListUseCase);
}
