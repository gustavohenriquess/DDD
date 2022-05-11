import fs from 'fs';
import { Controller } from '../../../../core/infra/Controller';
import { HttpResponse, fail, ok } from '../../../../core/infra/HttpResponse';
import { StartFileRequest } from 'modules/core/dtos';

export class ReturnStartFileController implements Controller {
  async handle(requestData: StartFileRequest): Promise<HttpResponse> {
    const { params } = requestData;
    const filePath =
      params && params.filePath ? params.filePath : './startFile.json';
    const fileType = params && params.fileType ? params.fileType : 'utf-8';

    try {
      if (!fs.existsSync(filePath)) {
        throw new Error('The files ${props.filePath} was not found');
      }

      const file = fs.readFileSync(filePath, fileType);
      const obj = JSON.parse(file);

      return ok(obj);
    } catch (err) {
      return fail(err as Error);
    }
  }
}
