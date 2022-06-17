import { Controller } from '@core/infra/Controller';
import { HttpResponse, fail, noContent } from '@core/infra/HttpResponse';
import { DeleteItemUseCase } from './DeleteItemUseCase';

type RequestType = {
  id: string;
  listId: string;
};

export class DeleteItemController implements Controller {
  constructor(private _deleteAllItems: DeleteItemUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, listId } = request;

      await this._deleteAllItems.execute({ id, listId });

      return noContent();
    } catch (err) {
      return fail(err as Error);
    }
  }
}
