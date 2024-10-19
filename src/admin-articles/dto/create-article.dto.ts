import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto {
	@IsNotEmpty({ message: "标题不能为空" })
	@IsString()
	readonly title: string;
	@IsNotEmpty({ message: "状态不能为空" })
	@IsIn([-1, 1], { message: "状态必须是-1或1" })
	readonly status: number;
	@IsNotEmpty({ message: "内容不能为空" })
	@IsString({ message: "内容必须是字符串" })
	readonly content: string;
	@IsString()
	readonly image: string;
	@IsString()
	readonly HeadImg: string = "";
	@IsNotEmpty({ message: "标签不能为空" })
	readonly tags: string[];
}
