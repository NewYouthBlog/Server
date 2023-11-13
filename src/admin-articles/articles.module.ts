import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { Article } from "./entities/article.entity";

const articleModel = TypegooseModule.forFeature([Article]);

@Module({
	controllers: [ArticlesController],
	providers: [ArticlesService],
	imports: [articleModel],
	exports: [articleModel],
})
export class AdminArticlesModule {}
