import { Controller } from '@core/infra/Controller';
import { HttpResponse, fail, ok } from '@core/infra/HttpResponse';
import { GetAllListsUseCase } from './GetAllListsUseCase';

export class GetAllListsController implements Controller {
  constructor(private _getListById: GetAllListsUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const result = await this._getListById.execute();

      return ok(result);
    } catch (err) {
      return fail(err as Error);
    }
  }
}
