import { Html, Head, Body, Container, Text, Button, Img } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import React from "react";
import { configuration } from "../../../config/config";
interface ConfirmEmailProps {
	name: string;
	token: string;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ name, token }) => {
	const url = "https://res.cloudinary.com/dyplcnldd/image/upload/v1743792101/Mokku_r6pmrh.png";
	return (
		<Tailwind>
			<Html>
				<Head />
				<Body className="bg-gray-100 p-6 text-center">
					<Container className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
						<Img src={url} className="mx-auto mb-4 w-[200px]" />
						<Text className="text-lg font-bold">Hola, {name} 👋</Text>
						<Text>Para confirmar tu cuenta, ingresa al siguiente enlace con el código:</Text>
						<Button
							href={`${configuration.url_front}/confirm-account`}
							className="bg-green-500 text-white px-4 py-2 rounded-md"
						>
							Confirmar Cuenta
						</Button>
						<Text className="text-sm mt-4">
							Código de confirmación: <strong>{token}</strong>
						</Text>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
};

export default ConfirmEmail;
