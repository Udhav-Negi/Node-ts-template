import dotenv from  "dotenv";
dotenv.config({path : ".env"})

import { definePrismaConfig } from "prisma/config";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./prisma/contract.prisma",
    db: {
      connection: process.env["PG_DATABASE_URL"]!,
    },
  }),
  skills: {
    check: false,
  },
});