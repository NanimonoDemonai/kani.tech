import { PrismaClient } from "@prisma/client";

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const _prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = _prisma;

export const prisma = _prisma;
