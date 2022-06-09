import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { GetListByIdController } from '@modules/toDo/useCases/GetListById/GetListByIdController';
import { GetListByIdUseCase } from '@modules/toDo/useCases/GetListById/GetListByIdUseCase';

export function GetListByIdControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const getListByIdUseCase = new GetListByIdUseCase(prismaListRepository);

  return new GetListByIdController(getListByIdUseCase);
}
