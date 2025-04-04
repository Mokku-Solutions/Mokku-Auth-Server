import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const config = () => {
	return {
		service: process.env.SMPT_HOST,
		auth: {
			user: process.env.SMPT_USER,
			pass: process.env.SMPT_PASS,
		},
	};
};

export const transporter = nodemailer.createTransport(config());
