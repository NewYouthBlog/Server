import {
	Controller,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Role } from "src/role/role.enum";
import { AllowedFrom } from "src/role/roles.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import multer from "multer";

@Controller("articles")
@AllowedFrom(Role.Admin)
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@Post()
	create(@Body() createArticleDto: CreateArticleDto) {
		return this.articlesService.create(createArticleDto);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateArticleDto: UpdateArticleDto) {
		return this.articlesService.update(id, updateArticleDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.articlesService.remove(id);
	}
}

@Controller("upload")
export class UploadController {
	@Post()
	@UseInterceptors(FileInterceptor("file"))
	upload(@UploadedFile() file: Express.Multer.File) {
		return file;
	}
}
