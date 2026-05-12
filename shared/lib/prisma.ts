import path from "node:path";
import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function loadWorkspaceEnv() {
  if (process.env.DATABASE_URL) {
    return;
  }

  const candidates = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "..", ".env.local"),
    path.resolve(process.cwd(), "..", ".env"),
  ];

  candidates.forEach((envPath) => {
    loadEnv({ path: envPath, override: false });
  });
}

loadWorkspaceEnv();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// Reaproveita a conexão no modo desenvolvimento para evitar múltiplos clients.
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(connectionString),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { prisma };
export default prisma;
