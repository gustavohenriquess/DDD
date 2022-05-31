import fs from 'fs';
import os from 'os';
import { Either, right } from '@core/logic/Either';

type FileType = 'utf-8';

export class ReturnStartFileUseCase {
  execute(filePath: string, fileType: FileType): Either<Error, object> {
    if (!fs.existsSync(filePath)) {
      throw new Error('The files ${props.filePath} was not found');
    }

    const totalMemory = os.totalmem() / (1024 * 1024 * 1024);
    const freeMemory = os.freemem() / (1024 * 1024 * 1024);
    const usageMemory = process.memoryUsage.rss() / (1024 * 1024);

    const file = fs.readFileSync(filePath, fileType);
    const obj = {
      uptime: process.uptime(),
      processMemoryUsage: `${this.precision(usageMemory)} Mb`,
      memoryTotal: `${this.precision(totalMemory)} Gb`,
      memoryFree: `${this.precision(freeMemory)} Gb`,
      ...JSON.parse(file),
    };

    return right(obj);
  }

  private precision(num: number): number {
    return parseFloat(num.toFixed(2));
  }
}
