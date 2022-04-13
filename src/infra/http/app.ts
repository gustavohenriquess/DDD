import cors from 'cors';
import express from 'express';
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

export { app };
