import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema";
import dotenv from "dotenv";
dotenv.config();

export const prismaClient = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" },
  ],
});

prismaClient.$on("error", (e) => {
  logger.error({
    message: "Prisma Error Log",
    error: e.message,
  });
});
prismaClient.$on("warn", (e) => {
  logger.warn({
    message: "Prisma Warn Log",
    warn: e.message,
  });
});
prismaClient.$on("info", (e) => {
  logger.info({
    message: "Prisma Info Log",
    info: e.message,
  });
});
prismaClient.$on("query", (e) => {
  logger.info({
    message: "Prisma Query Log",
    params: e.params,
    query: e.query,
  });
});

// Drizzle

const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on("error", (err) => {
  logger.error({
    message: "DB Error",
    error: err.message,
  });
});

export const drizzleClient = drizzle({
  client: pool,
  logger: {
    logQuery(query, params) {
      logger.info({
        message: "Drizzle Query Log",
        params: params,
        query: query,
      });
    },
  },
  schema: schema,
});
