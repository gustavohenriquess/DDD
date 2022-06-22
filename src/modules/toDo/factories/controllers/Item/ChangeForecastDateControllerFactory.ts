import { Controller } from '@core/infra/Controller';
import { PrismaItemRepository } from '@modules/toDo/repositories/Prisma/PrismaItemsRepository';
import { ChangeForecastDateController } from '@modules/toDo/useCases/Item/ChangeForecastDate/ChangeForecastDateController';
import { ChangeForecastDateUseCase } from '@modules/toDo/useCases/Item/ChangeForecastDate/ChangeForecastDateUseCase';

export function ChangeForecastDateControllerFactory(): Controller {
  const prismaItemRepository = new PrismaItemRepository();
  const changeForecastDateUseCase = new ChangeForecastDateUseCase(
    prismaItemRepository,
  );

  return new ChangeForecastDateController(changeForecastDateUseCase);
}
