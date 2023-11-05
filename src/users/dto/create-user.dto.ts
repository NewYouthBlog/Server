import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "src/role/role.enum";
export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(5, { message: "用户名必须为5位字符以上" })
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	roles: Role[] = [Role.User];
}
