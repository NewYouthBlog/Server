import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { AllowedFrom } from "src/role/roles.decorator";
import { Role } from "src/role/role.enum";
import { PublicApi } from "src/auth/auth.decorator";

@Controller("tags")
@AllowedFrom(Role.Admin)
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Post()
	create(@Body() createTagDto: CreateTagDto) {
		return this.tagsService.create(createTagDto);
	}

	@Get()
	@PublicApi()
	findAll() {
		return this.tagsService.findAll();
	}
	@Get(":id")
	@PublicApi()
	findOne(@Param("id") id: number) {
		return this.tagsService.findOne(Number(id));
	}

	@Patch(":id")
	update(@Param("id") id: number, @Body() updateTagDto: UpdateTagDto) {
		return this.tagsService.update(Number(id), updateTagDto);
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.tagsService.remove(Number(id));
	}
}
