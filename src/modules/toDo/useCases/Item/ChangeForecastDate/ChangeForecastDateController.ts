import { Controller } from '@core/infra/Controller';
import {
  HttpResponse,
  fail,
  noContent,
  clientError,
} from '@core/infra/HttpResponse';
import { ChangeForecastDateUseCase } from './ChangeForecastDateUseCase';

type RequestType = {
  id: string;
  listId: string;
  forecastDate: Date | null;
};

export class ChangeForecastDateController implements Controller {
  constructor(private _changeDone: ChangeForecastDateUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id, listId, forecastDate } = request;
      const result = await this._changeDone.execute({
        id,
        listId,
        forecastDate,
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
