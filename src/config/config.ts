import { config } from "dotenv";
config();

interface Configuration {
	database_url: string;
	port?: string;
	private_key: string;
	domain: string;
	url_front: string;
}

export const configuration: Configuration = {
	database_url: process.env.DATABASE_URL!,
	port: process.env.PORT,
	private_key: process.env.PRIVATE_KEY!,
	domain: process.env.DOMAIN!,
	url_front: process.env.URL_FRONT!,
};
