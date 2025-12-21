import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Role } from "src/role/role.enum";
import { AllowedFrom } from "src/role/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload_cloudflare.service";

@Controller("articles")
@AllowedFrom(Role.Admin)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(Number(id), updateArticleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.articlesService.remove(Number(id));
  }
}

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // 限制大小: 5MB
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          // 限制类型: 只能是图片
          new FileTypeValidator({ fileType: ".(png|jpeg|jpg|webp|gif)" }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadFile(file);
  }
}
