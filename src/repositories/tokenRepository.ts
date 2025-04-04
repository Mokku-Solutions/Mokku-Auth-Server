import { Types } from "mongoose";
import Token, { IToken } from "../models/token";

export class TokenRepository {
	public async createToken(token: string, user: Types.ObjectId): Promise<IToken> {
		return Token.create({ token, user });
	}
}
