import { Module } from "@nestjs/common";
import { PublicArticlesService } from "./public-articles.service";
import { PublicArticlesController } from "./public-articles.controller";
import { AdminArticlesModule } from "src/admin-articles/articles.module";

@Module({
	controllers: [PublicArticlesController],
	providers: [PublicArticlesService],
	imports: [AdminArticlesModule],
})
export class PublicArticlesModule {}
