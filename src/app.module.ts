import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env.development", isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "mysql",
				host: configService.get<string>("HOST"),
				port: configService.get<number>("PORT"),
				username: configService.get<string>("USERNAME"),
				password: configService.get<string>("PASSWORD"),
				database: configService.get("DATABASE"),
				autoLoadEntities: true,
				// 生产环境请勿使用
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
