import { IsNotEmpty, IsString } from "class-validator";

export class Tag {
	@IsNotEmpty()
	@IsString()
	name: string;
}
