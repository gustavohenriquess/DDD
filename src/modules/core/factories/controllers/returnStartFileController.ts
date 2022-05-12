import { Controller } from '@core/infra/Controller';
import { ReturnStartFileController } from '../../useCases/StartFile/ReturnStartFileController';

export function ReturnStartFileControllerFactory(): Controller {
  return new ReturnStartFileController();
}
