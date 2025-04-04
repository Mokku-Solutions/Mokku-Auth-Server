import { render } from "@react-email/render";
import { transporter } from "../../config/nodemailerConfig";
import ConfirmEmail from "./emails/ConfirmEmail";
import { ReactElement } from "react";

interface User {
	name: string;
	email: string;
	token: string;
}

export class NodemailerAdapter {
	static async sendConfirmationEmail(user: User) {
		try {
			const emailComponent = await ConfirmEmail({ name: user.name, token: user.token });

			const html = await render(emailComponent as ReactElement);

			await transporter.sendMail({
				from: "mokkusolutions@gmail.com",
				to: user.email,
				subject: "Mokku-Solutions - Confirmar Cuenta",
				html,
			});

			console.log("Correo enviado exitosamente.");
		} catch (error) {
			console.error("Error al enviar el correo:", error);
		}
	}
}
