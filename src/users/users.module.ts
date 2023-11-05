import { Module, forwardRef } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/auth/jwt.gurd";

@Module({
	imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
	controllers: [UsersController],
	providers: [
		UsersService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	exports: [UsersService],
})
export class UsersModule {}
