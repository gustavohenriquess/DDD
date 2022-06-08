import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { UpdateListController } from '@modules/toDo/useCases/UpdateList/UpdateListController';
import { UpdateListUseCase } from '@modules/toDo/useCases/UpdateList/UpdateListUseCase';

export function UpdateListControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const updateListUseCase = new UpdateListUseCase(prismaListRepository);

  return new UpdateListController(updateListUseCase);
}
