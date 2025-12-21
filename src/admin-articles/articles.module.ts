import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController, UploadController } from "./articles.controller";
import { TagsModule } from "src/tags/tags.module";
import { PrismaModule } from "nestjs-prisma";
import { UploadService } from "./upload_cloudflare.service";

@Module({
  controllers: [ArticlesController, UploadController],
  providers: [ArticlesService, UploadService],
  imports: [PrismaModule.forRoot(), TagsModule],
  exports: [TagsModule],
})
export class AdminArticlesModule {}
