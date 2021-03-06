import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  noContent,
  clientError,
} from '@core/infra/HttpResponse';
import { ChangeOrderUseCase } from './ChangeOrderUseCase';

type RequestType = {
  id: string;
  listId: string;
  order: number;
};

export class ChangeOrderController implements Controller {
  constructor(private _changeTitle: ChangeOrderUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, listId, order } = request;

      const result = await this._changeTitle.execute({ id, listId, order });

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
