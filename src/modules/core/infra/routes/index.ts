import express from 'express';
import { adaptRoute } from '@core/infra/adapters/ExpressRouteAdapter';
import { ReturnStartFileControllerFactory } from '../../factories/controllers/returnStartFileController';

const RouterCore = express.Router();

RouterCore.get('/', adaptRoute(ReturnStartFileControllerFactory()));

export { RouterCore };
