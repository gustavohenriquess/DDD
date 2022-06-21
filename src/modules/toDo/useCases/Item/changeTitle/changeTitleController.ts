import { Controller } from '@core/infra/Controller';
import { HttpResponse, fail, noContent } from '@core/infra/HttpResponse';
import { ChangeTitleUseCase } from './changeTitleUseCase';

type RequestType = {
  id: string;
  listId: string;
  title: string;
};

export class ChangeTitleController implements Controller {
  constructor(private _changeTitle: ChangeTitleUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, listId, title } = request;

      await this._changeTitle.execute({ id, listId, title });

      return noContent();
    } catch (err) {
      return fail(err as Error);
    }
  }
}
