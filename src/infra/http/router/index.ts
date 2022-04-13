import express from 'express';
import { v1Router } from './v1';

const router = express.Router();

router.use('/api/v1', v1Router);

// All routes go here

export { router };
