import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { InjectModel } from "nestjs-typegoose";
import { Article } from "./entities/article.entity";
import { ReturnModelType } from "@typegoose/typegoose";
import { TagsService } from "src/tags/tags.service";

@Injectable()
export class ArticlesService {
	constructor(
		@InjectModel(Article) private readonly articleRepository: ReturnModelType<typeof Article>,
		private readonly tagsService: TagsService,
	) {}
	async create(createArticleDto: CreateArticleDto) {
		// 先根据标签名找标签id
		for (let i = 0; i < createArticleDto.tags.length; i++) {
			const findTag = await this.tagsService.findWithName(createArticleDto.tags[i]);
			if (!findTag) {
				throw new BadRequestException("标签不存在");
			}
			createArticleDto.tags[i] = String(findTag._id);
		}
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
