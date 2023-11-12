import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TypegooseModule } from "nestjs-typegoose";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt.gurd";
import { TagsModule } from './tags/tags.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env.development", isGlobal: true }),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: `mongodb://${configService.get("USERNAME")}:${configService.get(
					"PASSWORD",
				)}@${configService.get("HOST")}:${configService.get("PORT")}/${configService.get(
					"DATABASE",
				)}`,
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
		TagsModule,
		ArticlesModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
