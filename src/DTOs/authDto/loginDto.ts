import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDTO {
	@IsEmail({}, { message: "El email no es válido" })
	email: string;

	@IsNotEmpty({ message: "La contraseña es obligatoria" })
	password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}
