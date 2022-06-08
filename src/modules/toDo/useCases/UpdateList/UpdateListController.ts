import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  clientError,
  noContent,
} from '@core/infra/HttpResponse';
import { UpdateListUseCase } from './UpdateListUseCase';

type RequestType = {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
};
export class UpdateListController implements Controller {
  constructor(private _updateList: UpdateListUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, title, description, isActive } = request;

      const result = await this._updateList.execute({
        id,
        title,
        description,
        isActive,
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
