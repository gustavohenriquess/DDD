import { Controller } from '@core/infra/Controller';
import { clientError, fail, HttpResponse, ok } from '@core/infra/HttpResponse';
import { StartFileRequest } from 'modules/core/dtos';
import { ReturnStartFileUseCase } from './ReturnStartFileUseCase';

export class ReturnStartFileController implements Controller {
  constructor(private _returnStartFileUseCase: ReturnStartFileUseCase) {}

  async handle(requestData: StartFileRequest): Promise<HttpResponse> {
    try {
      const { params } = requestData;
      const filePath =
        params && params.filePath ? params.filePath : './startFile.json';
      const fileType = params && params.fileType ? params.fileType : 'utf-8';

      const result = this._returnStartFileUseCase.execute(filePath, fileType);

      if (result.isLeft()) {
        const error = result.value;

        return clientError(error);
      } else {
        return ok(result.value);
      }
    } catch (err) {
      return fail(err as Error);
    }
  }
}
