import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { GetAllListsController } from '@modules/toDo/useCases/GetAllLists/GetAllListsController';
import { GetAllListsUseCase } from '@modules/toDo/useCases/GetAllLists/GetAllListsUseCase';

export function GetAllListsControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const getListByIdUseCase = new GetAllListsUseCase(prismaListRepository);

  return new GetAllListsController(getListByIdUseCase);
}
