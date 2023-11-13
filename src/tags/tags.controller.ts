import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { AllowedFrom } from "src/role/roles.decorator";
import { Role } from "src/role/role.enum";

@Controller("tags")
@AllowedFrom(Role.Admin)
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Post()
	create(@Body() createTagDto: CreateTagDto) {
		return this.tagsService.create(createTagDto);
	}

	@Get()
	findAll() {
		return this.tagsService.findAll();
	}
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.tagsService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateTagDto: UpdateTagDto) {
		return this.tagsService.update(id, updateTagDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.tagsService.remove(id);
	}
}
