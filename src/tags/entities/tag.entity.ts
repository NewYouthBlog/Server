import { prop } from "@typegoose/typegoose";

export class Tag {
	@prop({ required: true })
	name: string;
}
