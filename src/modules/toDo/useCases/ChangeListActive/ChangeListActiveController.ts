import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  clientError,
  noContent,
} from '@core/infra/HttpResponse';
import { ChangeListIsActiveUseCase } from './ChangeListActiveUseCase';

type RequestType = {
  id: string;
  isActive: boolean;
};

export class ChangeListIsActiveController implements Controller {
  constructor(private _changeListIsActive: ChangeListIsActiveUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, isActive } = request;

      const result = await this._changeListIsActive.execute({
        id,
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
