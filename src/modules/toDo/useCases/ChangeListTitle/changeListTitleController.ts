import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  clientError,
  noContent,
} from '@core/infra/HttpResponse';
import { ChangeListTitleUseCase } from './changeListTitleUseCase';

type RequestType = {
  id: string;
  title: string;
};
export class ChangeListTitleController implements Controller {
  constructor(private _changeListTitle: ChangeListTitleUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, title } = request;

      const result = await this._changeListTitle.execute({
        id,
        title,
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
