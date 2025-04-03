import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
	private authService: AuthService;
	constructor() {
		this.authService = new AuthService();
		this.Register = this.Register.bind(this);
	}

	Register = async (req: Request, res: Response) => {
		try {
			const [error, user] = await this.authService.register(req.body);
			if (error) {
				res.status(400).json(error);
				return;
			}
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ error: "Hubo un error" });
		}
	};
	Login = async (req: Request, res: Response) => {
		try {
			const [error, user] = await this.authService.login(req.body);
			if (error) {
				res.status(400).json(error);
				return;
			}
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ error: "Hubo un error" });
		}
	};
	User = async (req: Request, res: Response) => {
		try {
			const user = await this.authService.getUser(req.userId!);
			if (!user) {
				const error = "No se encontro ningún usuario";
				res.status(400).json({ error });
				return;
			}
			res.json(user);
		} catch (error) {
			res.status(500).json({ error: "Hubo un error" });
		}
	};
}
