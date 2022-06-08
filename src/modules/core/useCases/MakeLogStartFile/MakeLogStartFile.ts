import fs from 'fs';
import { StartFileProps } from '@modules/core/dtos';

export class MakeLogStartFileUseCase {
  execute(props: StartFileProps) {
    if (!fs.existsSync(props.filePath)) {
      throw new Error(`Error OnReadFile: File ${props.filePath} not found`);
    }

    fs.readFile(props.filePath, props.fileType, (err, data) => {
      if (err) {
        throw new Error(`Error OnReadFile: ${err.message}`);
      }

      const lines = data.split('\n');

      lines.forEach((line) => {
        console.log(line);
      });
    });
  }
}
