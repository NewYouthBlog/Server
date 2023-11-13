import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { Article } from "./entities/article.entity";

@Module({
	controllers: [ArticlesController],
	providers: [ArticlesService],
	imports: [TypegooseModule.forFeature([Article])],
})
export class AdminArticlesModule {}
