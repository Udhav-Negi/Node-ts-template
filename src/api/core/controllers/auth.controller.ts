import { DatabaseConfig } from "../../config/database.config";
import { LoginDto } from "../dto/main.dto";
import { IRequest, RouteController } from "../types/interfaces/request.interface";
import { Response } from "express";


class AuthController implements RouteController {

  private static controllerObj: AuthController;

  constructor() {

  }

  static getController(): AuthController {
    if (!this.controllerObj) {
      this.controllerObj = new AuthController();
    }

    return this.controllerObj;
  }


  public login = async (
    req: Omit<any, "body"> & { body: LoginDto },
    res: Response,
  ) => {
    try {

    } catch (error) {
      console.log("erro:", error);
    }
  };

  public logout = (req: IRequest, res: Response) => {

  }

}

export {AuthController};