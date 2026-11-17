import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";
import type { Contract } from "../../../prisma/contract.d.ts";
import contractJson from "../../../prisma/contract.json" with { type: "json" };

class DatabaseConfig {

  private static pgObj: DatabaseConfig;
  private db;

  private constructor() {
    const contract = contractFromJson<Contract>(contractJson);

    this.db = postgres({
      contract,
      url: process.env["PG_DATABASE_URL"]!,
    });

  }


  static async connectToPgDb() {
    if(this.pgObj == undefined || this.pgObj == null) {
      this.pgObj = new DatabaseConfig();
    }

    await this.pgObj.connectToPgDb();

  }

  async connectToPgDb() {
    await this.db.connect();
    console.log("Connected to pg database");
  }

  static getPgDbObject() {
      return this.pgObj.db;

  }

}

export { DatabaseConfig };
