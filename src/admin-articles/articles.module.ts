import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController, UploadController } from "./articles.controller";
import { TagsModule } from "src/tags/tags.module";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { PrismaModule } from "nestjs-prisma";

@Module({
	controllers: [ArticlesController, UploadController],
	providers: [ArticlesService],
	imports: [
		PrismaModule.forRoot(),
		TagsModule,
		MulterModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				storage: require("multer-cos-x")({
					cos: {
						SecretId: configService.get("COS_SECRET_ID"),
						SecretKey: configService.get("COS_SECRET_KEY"),
						Bucket: configService.get("COS_BUCKET"),
						Region: configService.get("COS_REGION"),
						// domain: process.env.COS_DOMAIN,
					},
				}),
			}),
			inject: [ConfigService],
		}),
	],
	exports: [TagsModule],
})
export class AdminArticlesModule {}
