import { Request, Response, Router } from "express";
import passport from "passport";
import { MainController } from "../../controllers/main.controller";

const mainRoutes = Router();

mainRoutes.post('/signup', MainController.getController().signUp);

mainRoutes.post('/shortenurl', MainController.getController().generateSlug);
mainRoutes.get('/logout', MainController.getController().generateSlug);

export {mainRoutes};