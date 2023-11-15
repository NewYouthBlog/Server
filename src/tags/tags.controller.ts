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
	findOne(@Param("id") id: string) {
		return this.tagsService.findOne(id);
	}
	@Get(":name")
	findWithName(@Param("name") name: string) {
		return this.tagsService.findWithName(name);
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
