import { Module } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { TagsController } from "./tags.controller";
import { PrismaModule } from "nestjs-prisma";

@Module({
	imports: [PrismaModule.forRoot()],
	controllers: [TagsController],
	providers: [TagsService],
	exports: [TagsService],
})
export class TagsModule {}
