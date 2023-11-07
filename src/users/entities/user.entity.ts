import { prop } from "@typegoose/typegoose";
import { Role } from "src/role/role.enum";

// @modelOptions({ schemaOptions: { collection: "user" } })
export class users {
	@prop({ required: true })
	username: string;
	@prop({ required: true })
	password: string;
	@prop({ allowMixed: 0, default: ["user"] })
	roles: Role[];
}
