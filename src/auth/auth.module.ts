import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
	providers: [AuthService, LocalStrategy],
	exports: [AuthService],
	imports: [
		forwardRef(() => UsersModule),
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				secret: configService.get("SECRET"),
				signOptions: { expiresIn: configService.get("TOKENEXPIRE") },
			}),
			inject: [ConfigService],
		}),
	],
})
export class AuthModule {}
