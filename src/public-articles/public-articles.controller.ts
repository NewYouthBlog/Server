import { Controller, Get, Param, Query } from "@nestjs/common";
import { PublicArticlesService } from "./public-articles.service";
import { PublicApi } from "src/auth/auth.decorator";
import { PaginationDto } from "./dto/pageination.dto";

@Controller("articles")
@PublicApi()
export class PublicArticlesController {
	constructor(private readonly publicArticlesService: PublicArticlesService) {}

	@Get()
	findAll(@Query() { status, page, limit }: PaginationDto) {
		return this.publicArticlesService.findAll(status, page, limit);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.publicArticlesService.findOne(id);
	}

	@Get("/tags/:tagname")
	findArticleByTag(@Param("tagname") id: string, @Query() { status, page, limit }: PaginationDto) {
		return this.publicArticlesService.findArticleByTag(id, status, page, limit);
	}
}

@Controller()
@PublicApi()
export class PublicOtherController {
	constructor(private readonly publicArticlesService: PublicArticlesService) {}
	@Get("/archive")
	findArchive() {
		return this.publicArticlesService.findArchive();
	}
	@Get("/headline")
	findHeadline() {
		return this.publicArticlesService.findHeadline();
	}
}
