import { Module } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { TagsController } from "./tags.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { Tag } from "./entities/tag.entity";

@Module({
	controllers: [TagsController],
	providers: [TagsService],
	imports: [TypegooseModule.forFeature([Tag])],
	exports: [TagsService],
})
export class TagsModule {}
