import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { InjectModel } from "nestjs-typegoose";
import { Article } from "./entities/article.entity";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class ArticlesService {
	constructor(
		@InjectModel(Article) private readonly articleRepository: ReturnModelType<typeof Article>,
	) {}
	async create(createArticleDto: CreateArticleDto) {
		const article = await this.articleRepository.create(createArticleDto);
		return article;
	}

	async update(id: string, updateArticleDto: UpdateArticleDto) {
		await this.articleRepository.findByIdAndUpdate(id, updateArticleDto);
	}

	async remove(id: string) {
		const findArticle = await this.articleRepository.findOne({ _id: id });
		if (!findArticle) {
			throw new BadRequestException("该文章不存在");
		}
		await this.articleRepository.deleteOne({ _id: id });
	}
}
