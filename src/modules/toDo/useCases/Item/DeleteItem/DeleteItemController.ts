import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  noContent,
  clientError,
} from '@core/infra/HttpResponse';
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

      const result = await this._deleteAllItems.execute({ id, listId });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      } else {
        return noContent();
      }
    } catch (err) {
      return fail(err as Error);
    }
  }
}
