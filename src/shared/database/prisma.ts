import { PrismaClient } from '@/generated/prisma';

console.log('Importing PrismaClient from @prisma/client');

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

console.log('Initializing PrismaClient...');

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

console.log('PrismaClient initialized:', !!prisma);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;