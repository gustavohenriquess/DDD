import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { ChangeTitleController } from '@modules/toDo/useCases/Item/changeTitle/changeTitleController';
import { ChangeTitleUseCase } from '@modules/toDo/useCases/Item/changeTitle/changeTitleUseCase';

export function ChangeTitleControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const changeTitleUseCase = new ChangeTitleUseCase(prismaItemRepository);

  return new ChangeTitleController(changeTitleUseCase);
}
