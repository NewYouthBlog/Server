import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const findtag = await this.prisma.tag.findFirst({
      where: {
        name: createTagDto.name,
      },
    });
    if (findtag) {
      throw new BadRequestException("该标签已存在");
    }
    const tag = await this.prisma.tag.create({ data: createTagDto });
    return tag;
  }

  async findAll() {
    return await this.prisma.tag.findMany();
  }

  async findOne(id: number) {
    const findtag = await this.prisma.tag.findMany({
      where: { id: id },
      include: { articles: true },
    });
    if (!findtag) {
      throw new BadRequestException("该标签不存在");
    }
    return findtag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    await this.prisma.tag.update({ where: { id: id }, data: updateTagDto });
    return { name: updateTagDto.name };
  }

  async remove(id: number) {
    const tag = await this.prisma.tag.findUnique({ where: { id: id } });
    if (!tag) {
      throw new BadRequestException("该标签不存在");
    }
    await this.prisma.tag.delete({ where: { id: id } });
  }
}
