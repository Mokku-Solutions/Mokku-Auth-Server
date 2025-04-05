import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class TokenDto {
	@MinLength(6, { message: "El token debe ser de 6 caracteres" })
	@MaxLength(6, { message: "El token debe ser de 6 caracteres" })
	@IsNotEmpty({ message: "Debes ingresar el token" })
	token: string;

	constructor(token: string) {
		this.token = token;
	}
}
