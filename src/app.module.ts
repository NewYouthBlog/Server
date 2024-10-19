import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt.gurd";
import { TagsModule } from "./tags/tags.module";
import { AdminArticlesModule } from "./admin-articles/articles.module";
import { PublicArticlesModule } from "./public-articles/public-articles.module";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env.development", isGlobal: true }),
		UsersModule,
		AuthModule,
		TagsModule,
		AdminArticlesModule,
		PublicArticlesModule,
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
