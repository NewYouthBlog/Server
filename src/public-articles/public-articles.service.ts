import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { Article } from "src/admin-articles/entities/article.entity";
import { TagsService } from "src/tags/tags.service";

@Injectable()
export class PublicArticlesService {
	constructor(
		@InjectModel(Article) private readonly articleRepository: ReturnModelType<typeof Article>,
		private readonly tagsService: TagsService,
	) {}
	async findAll(status = 1, skip = 0, limit?: number) {
		const query = this.articleRepository
			.find({ status })
			.sort({ _id: -1 })
			.populate("tags", "name");
		if (skip) {
			query.skip(skip - 1);
		}
		if (limit) {
			query.limit(limit);
		}
		return query.exec();
	}

	async findOne(id: string) {
		return await this.articleRepository.findById(id).populate("tags", "name");
	}

	async findArticleByTag(tagname: string) {
		const tag = await this.tagsService.findWithName(tagname);
		return await this.articleRepository.find({ tags: { $in: [tag._id] } }).populate("tags", "name");
	}

	// 归档文章查询，根据时间排序
	async findArchive() {
		return await this.articleRepository.aggregate([
			{
				$match: {
					status: 1,
				},
			},
			{
				$project: {
					year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
					title: 1,
					createdAt: 1,
				},
			},
			{
				$group: {
					_id: {
						year: "$year",
						month: "$month",
					},
					articles: {
						$push: {
							_id: "$_id",
							title: "$title",
							createdAt: "$createdAt",
						},
					},
				},
			},
			{
				$sort: {
					"_id.year": -1,
					"_id.month": -1,
				},
			},
		]);
	}
}
