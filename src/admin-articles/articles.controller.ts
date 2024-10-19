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
	@Post()
	@UseInterceptors(FileInterceptor("file"))
	upload(@UploadedFile() file: Express.Multer.File) {
		return file;
	}
}
