import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDB } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const pool = mariadb.createPool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaMariaDB(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;