import { Controller } from '@core/infra/Controller';
import { ReturnStartFileUseCase } from '@modules/core/useCases/ReturnStartFile/ReturnStartFileUseCase';
import { ReturnStartFileController } from '../../useCases/ReturnStartFile/ReturnStartFileController';

export function ReturnStartFileControllerFactory(): Controller {
  return new ReturnStartFileController(new ReturnStartFileUseCase());
}
