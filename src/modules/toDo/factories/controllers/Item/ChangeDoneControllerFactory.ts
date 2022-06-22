import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { ChangeDoneController } from '@modules/toDo/useCases/Item/changeDone/ChangeDoneController';
import { ChangeDoneUseCase } from '@modules/toDo/useCases/Item/changeDone/ChangeDoneUseCase';

export function ChangeDoneControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const changeDoneUseCase = new ChangeDoneUseCase(prismaItemRepository);

  return new ChangeDoneController(changeDoneUseCase);
}
