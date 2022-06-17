import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { ChangeListTitleController } from '@modules/toDo/useCases/ChangeListTitle/changeListTitleController';
import { ChangeListTitleUseCase } from '@modules/toDo/useCases/ChangeListTitle/changeListTitleUseCase';

export function ChangeListTitleControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const changeListTitleUseCase = new ChangeListTitleUseCase(
    prismaListRepository,
  );

  return new ChangeListTitleController(changeListTitleUseCase);
}
