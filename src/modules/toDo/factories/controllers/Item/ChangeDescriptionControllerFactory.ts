import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { ChangeDescriptionController } from '@modules/toDo/useCases/Item/ChangeDescription/ChangeDescriptionController';
import { ChangeDescriptionUseCase } from '@modules/toDo/useCases/Item/ChangeDescription/ChangeDescriptionUseCase';

export function ChangeDescriptionControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const changeDescriptionUseCase = new ChangeDescriptionUseCase(
    prismaItemRepository,
  );

  return new ChangeDescriptionController(changeDescriptionUseCase);
}
