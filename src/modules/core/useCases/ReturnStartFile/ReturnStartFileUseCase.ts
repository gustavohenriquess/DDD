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
      uptime: this.secondsToDayHourMinuteSeconds(process.uptime()),
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

  private secondsToDayHourMinuteSeconds(sec: number) {
    const secDay = 24 * 60 * 60;
    const secHour = 60 * 60;

    let day = Math.floor(sec / secDay);
    let hour = Math.floor((sec - day * secDay) / secHour);
    let minutes = Math.floor((sec - day * secDay - hour * secHour) / 60);
    let seconds = Math.round(
      sec - day * secDay - hour * secHour - minutes * 60,
    );

    const pad = function (n: number) {
      return n < 10 ? '0' + n : n;
    };

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hour++;
      minutes = 0;
    }
    if (hour === 24) {
      day++;
      hour = 0;
    }
    return `${day} days ${pad(hour)}:${pad(minutes)}:${pad(seconds)}`;
  }
}
