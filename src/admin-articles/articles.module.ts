import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { Article } from "./entities/article.entity";
import { TagsModule } from "src/tags/tags.module";

const articleModel = TypegooseModule.forFeature([Article]);

@Module({
	controllers: [ArticlesController],
	providers: [ArticlesService],
	imports: [articleModel, TagsModule],
	exports: [articleModel, TagsModule],
})
export class AdminArticlesModule {}
