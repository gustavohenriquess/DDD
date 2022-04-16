import { Controller } from '@core/infra/Controller';
import { HttpResponse } from '@core/infra/HttpResponse';

export class ControllerName implements Controller {
  async handle(request: RequestData): Promise<HttpResponse> {
    throw new Error('Method not implemented');
  }
}

type RequestData = any;
