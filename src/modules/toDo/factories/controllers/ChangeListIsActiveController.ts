import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { ChangeListIsActiveController } from '@modules/toDo/useCases/ChangeListActive/ChangeListActiveController';
import { ChangeListIsActiveUseCase } from '@modules/toDo/useCases/ChangeListActive/ChangeListActiveUseCase';

export function ChangeListIsActiveControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const changeListIsActiveUseCase = new ChangeListIsActiveUseCase(
    prismaListRepository,
  );

  return new ChangeListIsActiveController(changeListIsActiveUseCase);
}
