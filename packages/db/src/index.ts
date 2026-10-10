import { createRequire } from "node:module";
import { PrismaNeon } from "@prisma/adapter-neon";
import { env } from "@RealWorldProjects/env/server";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("../prisma/generated/index.js");

const adapter = new PrismaNeon({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
