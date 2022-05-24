import cors from 'cors';
import express, { Request, Response } from 'express';
import { config } from 'dotenv-flow';
config();

import { router } from './router';

const app = express();

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  }),
);

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  }),
);

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
