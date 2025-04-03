import jwt, { JwtPayload } from "jsonwebtoken";
import { configuration } from "../../config/config";

export class Jwt {
	static generateJwt(payload: JwtPayload) {
		return jwt.sign(payload, configuration.private_key as string, {
			expiresIn: "24h",
		});
	}
}
