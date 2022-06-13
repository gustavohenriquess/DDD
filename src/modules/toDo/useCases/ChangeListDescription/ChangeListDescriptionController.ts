import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  clientError,
  noContent,
} from '@core/infra/HttpResponse';
import { ChangeListDescriptionUseCase } from './ChangeListDescriptionUseCase';

type RequestType = {
  id: string;
  description: string;
};

export class ChangeListDescriptionController implements Controller {
  constructor(private _changeListDescription: ChangeListDescriptionUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, description } = request;

      const result = await this._changeListDescription.execute({
        id,
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
