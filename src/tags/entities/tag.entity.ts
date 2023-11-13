import { Ref, prop } from "@typegoose/typegoose";
import { Article } from "src/admin-articles/entities/article.entity";

export class Tag {
	@prop({ required: true })
	name: string;

	@prop({ ref: () => Article })
	articles: Ref<Article>[];
}
