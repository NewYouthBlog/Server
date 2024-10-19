import { Role } from "@prisma/client";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: "用户名必须为5位字符以上" })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  roles: Role = "user";
}
