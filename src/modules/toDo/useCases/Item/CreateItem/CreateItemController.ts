import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  created,
  clientError,
} from '@core/infra/HttpResponse';
import { CreateItemUseCase } from './CreateItemUseCase';

type RequestType = {
  title: string;
  description: string;
  forecastDate: string;
  listId: string;
};

export class CreateItemController implements Controller {
  constructor(private _createItem: CreateItemUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { title, description, forecastDate, listId } = request;

      const result = await this._createItem.execute({
        title,
        description,
        forecastDate: new Date(forecastDate),
        listId,
      });

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      } else {
        return created();
      }
    } catch (err) {
      return fail(err as Error);
    }
  }
}
