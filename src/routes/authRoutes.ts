import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { Authenticate } from "../middleware/authenticate";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.get("/user", Authenticate.authenticate, authController.User);

export default authRouter;
