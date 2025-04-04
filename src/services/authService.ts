import { validate } from "class-validator";
import { RegisterDTO } from "../DTOs/authDto/registerDto";
import { AuthRepository } from "../repositories/authRepository";
import { IUser } from "../models/user";
import { BcryptAdapter } from "../utils/bcrypt/bcrypt";
import { LoginDTO } from "../DTOs/authDto/loginDto";
import { Jwt } from "../utils/jwt/jwt";
import { Types } from "mongoose";
import { generateToken } from "../utils/token/token";
import { TokenRepository } from "../repositories/tokenRepository";
import { NodemailerAdapter } from "../utils/nodemailer/nodemailer";

export class AuthService {
	private readonly authRepository: AuthRepository;
	private readonly tokenRepository: TokenRepository;

	constructor() {
		this.authRepository = new AuthRepository();
		this.tokenRepository = new TokenRepository();
	}

	public async register(data: any): Promise<[object?, IUser?]> {
		const { name, email, password } = data;

		const userDto = new RegisterDTO(name, email, password);
		const errors = await validate(userDto);
		if (errors.length > 0) {
			const formattedErrors = errors.reduce((acc: any, err) => {
				acc[err.property] = Object.values(err.constraints || {});
				return acc;
			}, {});

			return [formattedErrors, undefined];
		}

		let user = await this.authRepository.findByEmail(email);
		if (user) {
			const error = "Ya existe un usuario con ese email";
			return [{ error }, undefined];
		}
		const newUser = {
			name,
			email,
			password: BcryptAdapter.hash(password),
		};

		user = await this.authRepository.create(newUser);
		const tokenConfirm = generateToken();
		const userId = new Types.ObjectId(user.id);
		const token = await this.tokenRepository.createToken(tokenConfirm, userId);

		await NodemailerAdapter.sendConfirmationEmail({
			name: user.name,
			email: user.email,
			token: token.token,
		});
		return [undefined, user];
	}

	public async login(data: any) {
		const { email, password } = data;

		const userDto = new LoginDTO(email, password);
		const errors = await validate(userDto);
		if (errors.length > 0) {
			const formattedErrors = errors.reduce((acc: any, err) => {
				acc[err.property] = Object.values(err.constraints || {});
				return acc;
			}, {});

			return [formattedErrors, undefined];
		}
		let user = await this.authRepository.findByEmail(email);
		if (!user) {
			const error = "No existe ningún usuario con ese email";
			return [{ error }, undefined];
		}
		const isValid = BcryptAdapter.compare(password, user.password);
		if (!isValid) {
			const error = "Contraseña incorrecta";
			return [{ error }, undefined];
		}
		const token = Jwt.generateJwt({ userId: user.id });
		return [undefined, { user, token }];
	}

	public async getUser(userId: Types.ObjectId) {
		return await this.authRepository.findById(userId);
	}
}
