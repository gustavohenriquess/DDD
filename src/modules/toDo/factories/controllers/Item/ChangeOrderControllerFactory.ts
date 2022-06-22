import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { ChangeOrderController } from '@modules/toDo/useCases/Item/ChangeOrder/ChangeOrderController';
import { ChangeOrderUseCase } from '@modules/toDo/useCases/Item/ChangeOrder/ChangeOrderUseCase';

export function ChangeOrderControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const changeOrderUseCase = new ChangeOrderUseCase(prismaItemRepository);

  return new ChangeOrderController(changeOrderUseCase);
}
