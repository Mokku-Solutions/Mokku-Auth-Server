import { Types } from "mongoose";
import Token, { IToken } from "../models/token";
import { TokenDto } from "../DTOs/authDto/tokenDto";

export class TokenRepository {
	public async createToken(token: string, user: Types.ObjectId): Promise<IToken> {
		return Token.create({ token, user });
	}
	public async findToken(token: TokenDto): Promise<IToken | null> {
	
		return Token.findOne({ token: token.token });
	}
}
