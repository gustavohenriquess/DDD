import { PrismaClient } from '@prisma/client';

interface configProps {
  log?: string[];
}

const config: configProps = {};

if (process.env.NODE_ENV == 'development') config.log = ['query'];

export const prisma = new PrismaClient(config);
