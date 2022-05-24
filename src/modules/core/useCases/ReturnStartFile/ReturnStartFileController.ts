import { Controller } from '@core/infra/Controller';
import { HttpResponse } from '@core/infra/HttpResponse';
import { StartFileRequest } from 'modules/core/dtos';
import { ReturnStartFileUseCase } from './ReturnStartFileUseCase';

export class ReturnStartFileController implements Controller {
  constructor(private _returnStartFileUseCase: ReturnStartFileUseCase) {}

  async handle(requestData: StartFileRequest): Promise<HttpResponse> {
    const { params } = requestData;
    const filePath =
      params && params.filePath ? params.filePath : './startFile.json';
    const fileType = params && params.fileType ? params.fileType : 'utf-8';

    return this._returnStartFileUseCase.execute(filePath, fileType);
  }
}
