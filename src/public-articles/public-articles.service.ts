import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { Article } from "src/admin-articles/entities/article.entity";

@Injectable()
export class PublicArticlesService {
	constructor(
		@InjectModel(Article) private readonly articleRepository: ReturnModelType<typeof Article>,
	) {}
	async findAll(status = 1, skip = 0, limit?: number) {
		const query = this.articleRepository
			.find({ status })
			.sort({ _id: -1 })
			.populate("tags", "name");
		if (limit) {
			query.skip(skip).limit(limit);
		}
		return query.exec();
	}

	findOne(id: number) {
		return `This action returns a #${id} publicArticle`;
	}
}
