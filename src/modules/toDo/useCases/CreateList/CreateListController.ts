import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  created,
  clientError,
} from '@core/infra/HttpResponse';
import { CreateListUseCase } from './CreateListUseCase';

type RequestType = {
  title: string;
  description: string;
  isActive: boolean;
};

export class CreateListController implements Controller {
  constructor(private _createList: CreateListUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { title, description, isActive } = request;

      const result = await this._createList.execute({
        title,
        description,
        isActive,
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
