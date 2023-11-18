import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController, UploadController } from "./articles.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { Article } from "./entities/article.entity";
import { TagsModule } from "src/tags/tags.module";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
const articleModel = TypegooseModule.forFeature([Article]);

@Module({
	controllers: [ArticlesController, UploadController],
	providers: [ArticlesService],
	imports: [
		articleModel,
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
	exports: [articleModel, TagsModule],
})
export class AdminArticlesModule {}
