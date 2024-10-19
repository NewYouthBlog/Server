import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ArticlesService {
	constructor(private prisma: PrismaService) {}
	async create(createArticleDto: CreateArticleDto) {
		// 先根据标签名找标签id
		const findTag = await this.prisma.tag.findMany({
			where: { name: { in: createArticleDto.tags } },
		});
		if (findTag.length !== createArticleDto.tags.length) {
			throw new BadRequestException("标签不存在");
		}
		const article = await this.prisma.article.create({
			data: {
				title: createArticleDto.title,
				status: createArticleDto.status,
				content: createArticleDto.content,
				image: createArticleDto.image,
				HeadImg: createArticleDto.HeadImg,
				tags: {
					connect: findTag.map((tag) => ({ id: tag.id })),
				},
			},
		});
		return article;
	}

	async update(id: number, updateArticleDto: UpdateArticleDto) {
		// find id
		const findid = await this.prisma.article.findUnique({
			where: {
				id: id,
			},
		});
		if (!findid) {
			throw new BadRequestException("文章不存在");
		}
		// 先根据标签名找标签id
		const findTag = await this.prisma.tag.findMany({
			where: { name: { in: updateArticleDto.tags } },
		});
		if (findTag.length !== updateArticleDto.tags.length) {
			throw new BadRequestException("标签不存在");
		}
		const article = await this.prisma.article.update({
			where: { id: id },
			data: {
				title: updateArticleDto.title,
				status: updateArticleDto.status,
				content: updateArticleDto.content,
				image: updateArticleDto.image,
				HeadImg: updateArticleDto.HeadImg,
				tags: {
					connect: findTag.map((tag) => ({ id: tag.id })),
				},
			},
		});
		return article;
	}

	async remove(id: number) {
		const findid = await this.prisma.article.findUnique({
			where: {
				id: id,
			},
		});
		if (!findid) {
			throw new BadRequestException("文章不存在");
		}
		await this.prisma.article.delete({ where: { id: id } });
	}
}
