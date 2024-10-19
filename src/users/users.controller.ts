import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Request,
	UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { PublicApi } from "src/auth/auth.decorator";
import { AllowedFrom } from "src/role/roles.decorator";
import { Role } from "src/role/role.enum";

@Controller("users")
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService,
	) {}

	@PublicApi()
	@UseGuards(AuthGuard("ValidateUser"))
	@Post("login")
	async login(@Request() req: any) {
		return this.authService.realseToken(req.user);
	}

	@Post()
	@AllowedFrom(Role.Admin)
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@AllowedFrom(Role.Admin)
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	@AllowedFrom(Role.Admin)
	findOne(@Param("id") id: number) {
		return this.usersService.findOne(id);
	}

	@Patch(":id")
	@AllowedFrom(Role.Admin)
	update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	@AllowedFrom(Role.Admin)
	remove(@Param("id") id: number) {
		return this.usersService.remove(Number(id));
	}
}
