import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { DeleteListController } from '@modules/toDo/useCases/DeleteList/DeleteListController';
import { DeleteListUseCase } from '@modules/toDo/useCases/DeleteList/DeleteListUseCase';

export function DeleteListControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const deleteListUseCase = new DeleteListUseCase(prismaListRepository);

  return new DeleteListController(deleteListUseCase);
}
