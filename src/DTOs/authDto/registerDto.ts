import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDTO {
	@IsNotEmpty({ message: "El nombre es obligatorio" })
	name: string;

	@IsEmail({}, { message: "Email inválido" })
	email: string;

	@MinLength(6, { message: "El password debe contener al menos 6 caracteres" })
	password: string;

	constructor(name: string, email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
