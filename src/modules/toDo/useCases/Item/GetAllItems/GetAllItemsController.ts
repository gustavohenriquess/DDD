import { Controller } from '@core/infra/Controller';
import { HttpResponse, fail, ok } from '@core/infra/HttpResponse';
import { GetAllItemsUseCase } from './GetAllItemsUseCase';

type RequestType = {
  listId: string;
};

export class GetAllItemController implements Controller {
  constructor(private _getAllItems: GetAllItemsUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { listId } = request;

      const result = await this._getAllItems.execute({ listId });

      return ok(result);
    } catch (err) {
      return fail(err as Error);
    }
  }
}
