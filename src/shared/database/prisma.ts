import { PrismaClient } from '@prisma/client';

// se utiliza el cliente de prisma globalmente para evitar múltiples instancias en desarrollo
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}

// se crea una instancia de PrismaClient y se asigna a la variable prisma
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
})

// si no está en producción, se asigna la instancia de prisma al objeto
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;