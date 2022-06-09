import { Controller } from '@core/infra/Controller';
import { HttpResponse, fail, ok } from '@core/infra/HttpResponse';
import { GetListByIdUseCase } from './GetListByIdUseCase';

type RequestType = {
  id: string;
};
export class GetListByIdController implements Controller {
  constructor(private _getListById: GetListByIdUseCase) {}

  async handle(request: RequestType): Promise<HttpResponse> {
    try {
      const { id } = request;

      const result = await this._getListById.execute({
        id,
      });

      return ok(result);
    } catch (err) {
      return fail(err as Error);
    }
  }
}
