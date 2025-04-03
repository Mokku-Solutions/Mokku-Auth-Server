import { Types } from "mongoose";
import { RegisterDTO } from "../DTOs/authDto/registerDto";
import User, { IUser } from "../models/user";

export class AuthRepository {
	public async create(data: RegisterDTO): Promise<IUser> {
		return await User.create(data);
	}
	public async findByEmail(email: string): Promise<IUser | null> {
		return await User.findOne({ email });
	}
	public async findById(userId: Types.ObjectId): Promise<IUser | null> {
		return await User.findById(userId);
	}
}
