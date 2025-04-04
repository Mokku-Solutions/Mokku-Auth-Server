import mongoose, { Schema } from "mongoose";
import { ROLES } from "../utils/constants/authorizationConstants";

interface IUserPermissions {
	canCreateProduct: boolean;
	canEditStock: boolean;
	canSeeProfitMargins: boolean;
	canGenerateReports: boolean;
	canAccessPOS: boolean;
	canCreateUsers: boolean;
	canScanWithDevice: boolean;
}

interface IRole {
	name: ROLES;
	defaultPermissions: Partial<IUserPermissions>;
}

export interface IUser {
	id: string;
	email: string;
	name: string;
	password: string;
	role: IRole;
	isActive: boolean;
	customPermissions?: Partial<IUserPermissions>;
	token: string;
}

const UserSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			require: true,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			require: true,
		},
		password: {
			type: String,
			require: true,
			trim: true,
		},
		role: {
			type: String,
			default: ROLES.ADMIN,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		customPermissions: {
			type: Object,
			default: {
				canCreateProduct: false,
				canEditStock: false,
				canSeeProfitMargins: false,
				canGenerateReports: false,
				canAccessPOS: false,
				canCreateUsers: false,
				canScanWithDevice: false,
			},
		},
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
