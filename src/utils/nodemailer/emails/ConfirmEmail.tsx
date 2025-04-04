import { Html, Head, Body, Container, Text, Button, Img } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import React from "react";
interface ConfirmEmailProps {
	name: string;
	token: string;
}

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ name, token }) => {
	return (
		<Tailwind>
			<Html>
				<Head />
				<Body className="bg-gray-100 p-6 text-center">
					<Container className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
						<Img
							src={`https://res.cloudinary.com/dyplcnldd/image/upload/v1743791109/Mokku_r6pmrh.svg`}
							width="80"
							className="mx-auto mb-4"
						/>
						<Text className="text-lg font-bold">Hola, {name} 👋</Text>
						<Text>Para confirmar tu cuenta, ingresa al siguiente enlace con el código:</Text>
						<Button className="bg-green-500 text-white px-4 py-2 rounded-md">Confirmar Cuenta</Button>
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
