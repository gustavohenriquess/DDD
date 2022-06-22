import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  noContent,
  clientError,
} from '@core/infra/HttpResponse';
import { ChangeDescriptionUseCase } from './ChangeDescriptionUseCase';

type RequestType = {
  id: string;
  listId: string;
  description: string;
};

export class ChangeDescriptionController implements Controller {
  constructor(private _changeDescription: ChangeDescriptionUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, listId, description } = request;

      const result = await this._changeDescription.execute({
        id,
        listId,
        description,
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
