// Configuração central do Prisma: schema, migrations, seed e banco.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "shared/prisma/schema.prisma",
  migrations: {
    path: "shared/prisma/migrations",
    seed: "tsx shared/prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
