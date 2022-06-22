import { Controller } from '@core/infra/Controller';
import { HttpResponse, fail, noContent } from '@core/infra/HttpResponse';
import { ChangeDoneUseCase } from './ChangeDoneUseCase';

type RequestType = {
  id: string;
  listId: string;
  done: boolean;
};

export class ChangeDoneController implements Controller {
  constructor(private _changeDone: ChangeDoneUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, listId, done } = request;

      await this._changeDone.execute({ id, listId, done });

      return noContent();
    } catch (err) {
      return fail(err as Error);
    }
  }
}
