import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { configuration } from "../config/config";
import { Types } from "mongoose";

declare global {
	namespace Express {
		interface Request {
			userId?: Types.ObjectId;
		}
	}
}

export class Authenticate {
	static authenticate(req: Request, res: Response, next: NextFunction) {
		const authorization = req.headers.authorization;
		try {
			if (!authorization) {
				const error = "No autorizado";
				res.status(401).json({ error });
				return;
			}
			const token = authorization.split(" ")[1];
			if (!token) {
				const error = "No autorizado";
				res.status(401).json({ error });
				return;
			}
			const decoded = jwt.verify(token, configuration.private_key as string);

			if (typeof decoded === "object" && decoded.userId) {
				req.userId = decoded.userId;
				next();
			} else {
				const error = "No autorizado";
				res.status(401).json({ error });
				return;
			}
		} catch (error) {
			res.status(401).json({ error: "Token inválido o expirado" });
			return;
		}
	}
}
