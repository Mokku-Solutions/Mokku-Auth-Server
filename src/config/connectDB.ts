import mongoose from "mongoose";
import { exit } from "node:process";
import { configuration } from "./config";

export const connectDB = async () => {
	const uri = configuration.database_url;
	return await mongoose
		.connect(uri)
		.then(() => console.log("Conexion a la base datos!!!"))
		.catch(() => {
			console.log("Error al conectarse a la base de datos");
			exit(1);
		});
};
