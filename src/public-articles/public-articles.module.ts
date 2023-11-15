import { Module } from "@nestjs/common";
import { PublicArticlesService } from "./public-articles.service";
import { PublicArticlesController, PublicOtherController } from "./public-articles.controller";
import { AdminArticlesModule } from "src/admin-articles/articles.module";

@Module({
	controllers: [PublicArticlesController, PublicOtherController],
	providers: [PublicArticlesService],
	imports: [AdminArticlesModule],
})
export class PublicArticlesModule {}
