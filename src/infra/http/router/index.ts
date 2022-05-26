import express from 'express';
import { RouterCore } from '@modules/core/infra/routes';
import { v1Router } from './v1';

const router = express.Router();

router.use('/', RouterCore);
router.use('/api/v1', v1Router);

// All routes version go here

export { router };
