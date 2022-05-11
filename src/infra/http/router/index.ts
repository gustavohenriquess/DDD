import express from 'express';
import { RouterCore } from '../../../modules/core/infra/routes';

const router = express.Router();

router.use('/', RouterCore);

// All routes go here

export { router };
