import { Router } from "express";
import passport from "passport";
import { AuthController } from "../../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login1'
}));

authRoutes.get('/logout', AuthController.getController().logout);

export {authRoutes};