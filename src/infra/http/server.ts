import { app } from './app';
import { MakeLogStartFileUseCase } from '../../modules/core/useCases/StartFile/MakeLogStartFile';

const port = process.env.PORT || 3000;
const makeLog = new MakeLogStartFileUseCase();

makeLog.execute({ filePath: './startArt.txt', fileType: 'utf-8' });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
