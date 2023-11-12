import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { InjectModel } from "nestjs-typegoose";
import { Tag } from "./entities/tag.entity";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class TagsService {
	constructor(@InjectModel(Tag) private readonly tagsRepository: ReturnModelType<typeof Tag>) {}

	async create(createTagDto: CreateTagDto) {
		const findtag = await this.tagsRepository.findOne({ name: createTagDto.name });
		if (findtag) {
			throw new BadRequestException("该标签已存在");
		}
		const tag = await this.tagsRepository.create(createTagDto);
		return tag;
	}

	async findAll() {
		return await this.tagsRepository.find();
	}

	async update(id: string, updateTagDto: UpdateTagDto) {
		await this.tagsRepository.findByIdAndUpdate(id, updateTagDto);
		return { name: updateTagDto.name };
	}

	async remove(id: string) {
		const findtag = await this.tagsRepository.findOne({ _id: id });
		if (!findtag) {
			throw new BadRequestException("该标签不存在");
		}
		await this.tagsRepository.deleteOne({ _id: id });
	}
}
