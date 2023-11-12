import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Article extends TimeStamps {
	@prop({ required: true })
	title: string;
	@prop({ required: true })
	status: number;
	@prop({ required: true })
	content: string;
	@prop({
		default:
			"https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png",
	})
	image: string;
	@prop({ default: "" })
	HeadImg: string;
}
