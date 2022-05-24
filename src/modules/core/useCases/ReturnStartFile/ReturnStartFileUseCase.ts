import fs from 'fs';
import { HttpResponse, ok } from '@core/infra/HttpResponse';

type FileType = 'utf-8';

export class ReturnStartFileUseCase {
  async execute(filePath: string, fileType: FileType): Promise<HttpResponse> {
    if (!fs.existsSync(filePath)) {
      throw new Error('The files ${props.filePath} was not found');
    }

    const file = fs.readFileSync(filePath, fileType);
    const obj = JSON.parse(file);

    return ok(obj);
  }
}
