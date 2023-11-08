import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { users } from "./entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { TypegooseModule } from "nestjs-typegoose";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "src/role/roles.guard";

@Module({
	imports: [TypegooseModule.forFeature([users]), forwardRef(() => AuthModule)],
	controllers: [UsersController],
	providers: [
		UsersService,
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
	exports: [UsersService],
})
export class UsersModule {}
