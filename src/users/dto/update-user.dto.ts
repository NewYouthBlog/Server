import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString, MinLength } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsString()
	@MinLength(5, { message: "用户名必须为5位字符以上" })
	username: string;

	@IsString()
	password: string;

	roles: string[] = ["user"];
}
