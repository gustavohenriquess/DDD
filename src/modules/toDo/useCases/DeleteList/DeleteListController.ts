import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  clientError,
  noContent,
} from '@core/infra/HttpResponse';
import { DeleteListUseCase } from './DeleteListUseCase';

type RequestType = {
  id: string;
};

export class DeleteListController implements Controller {
  constructor(private _deleteList: DeleteListUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id } = request;

      const result = await this._deleteList.execute({
        id,
      });

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
