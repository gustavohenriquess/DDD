import { Controller } from '@core/infra/Controller';
import { PrismaListRepository } from '@modules/toDo/repositories/Prisma/PrismaListRepository';
import { ChangeListDescriptionController } from '@modules/toDo/useCases/ChangeListDescription/ChangeListDescriptionController';
import { ChangeListDescriptionUseCase } from '@modules/toDo/useCases/ChangeListDescription/ChangeListDescriptionUseCase';

export function ChangeListDescriptionControllerFactory(): Controller {
  const prismaListRepository = new PrismaListRepository();
  const changeListDescriptionUseCase = new ChangeListDescriptionUseCase(
    prismaListRepository,
  );

  return new ChangeListDescriptionController(changeListDescriptionUseCase);
}
