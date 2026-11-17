import crypto from "crypto";
import bcrypt from "bcrypt";
import {
  IRequest,
  RouteController,
} from "../types/interfaces/request.interface";
import { Response } from "express";
import { DatabaseConfig } from "../../config/database.config";
import { GenerateSlugDto, LoginDto, SignUpDto } from "../dto/main.dto";

class MainController implements RouteController {
  private static controllerObj: MainController;
  ALPHABET: string;

  private constructor() {
    this.ALPHABET =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  static getController(): MainController {
    if (!this.controllerObj) {
      this.controllerObj = new MainController();
    }

    return this.controllerObj;
  }

  public signUp = async (
    req: Omit<any, "body"> & { body: SignUpDto },
    res: Response,
  ) => {
    try {
      const { email, password } = req.body;
      const db = DatabaseConfig.getPgDbObject();
      const saltRounds = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const plan = db.raw.sql`
                insert into "User"(email, password) values(${email}, ${hashedPassword}) 
            `
        .affectedCount()
        .build();

      const affectedCount = await db.query(plan);
      console.log("affectedCount:", affectedCount);

      res.json({
        status: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  

  private generateHash(length = 8): string {
    const ALPHABET = this.ALPHABET;
    let slug = "";
    while (slug.length < length) {
      const bytes = crypto.randomBytes(length);
      for (const byte of bytes) {
        if (byte < 248) {
          slug += ALPHABET[byte % 62];
        }
      }
    }

    return slug;
  }

  public generateSlug = async (
    req: Omit<any, "body"> & { body: GenerateSlugDto },
    res: Response,
  ): Promise<any> => {
    try {

      const { url } = req.body;

      let slug = "";
      let retryCount = 0,
        totalCount = 3;
      const db = DatabaseConfig.getPgDbObject();

      while (retryCount < totalCount) {
        console.log("retryCount:", retryCount);
        try {
          slug = this.generateHash();
          if (db) {
            const plan1 = db.raw.sql`
                            insert into "Slug" (slug, url) values (${slug}, ${url}) 
                            returning id 
                        `
              .returnsRow({
                id: db.sql.public.Slug.columns.id,
              })
              .build();

            const slugId = await db.query(plan1);
            const plan2 = db.raw.sql`
                            insert into "Url" (url, userId) values (${url}, ${Math.ceil(Math.random()) * 10}) 
                            returning id 
                        `
              .affectedCount()
              .build();

            const affectedCount = await db.query(plan2);

            console.log("slugId:", slugId);
            console.log("affectedCount:", affectedCount);
            break;
          }
        } catch (error) {
          console.log("error:", error);
        }
        retryCount++;
      }

      return res.json({
        slug,
      });
    } catch (error) {}
  };
}

export { MainController };
