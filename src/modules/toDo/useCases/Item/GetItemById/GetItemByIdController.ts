import { Controller } from '@core/infra/Controller';
import { HttpResponse, fail, ok } from '@core/infra/HttpResponse';
import { GetItemByIdUseCase } from './GetItemByIdUseCase';

type RequestType = {
  id: string;
  listId: string;
};

export class GetItemByIdController implements Controller {
  constructor(private _getItemById: GetItemByIdUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, listId } = request;

      const result = await this._getItemById.execute({ id, listId });

      return ok(result);
    } catch (err) {
      return fail(err as Error);
    }
  }
}
