import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { Authenticate } from "../middleware/authenticate";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/user", Authenticate.authenticate, authController.user);
authRouter.post("/confirm-account", authController.confirmAccount);

export default authRouter;
