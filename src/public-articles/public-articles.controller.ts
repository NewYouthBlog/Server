import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicArticlesService } from './public-articles.service';
import { CreatePublicArticleDto } from './dto/create-public-article.dto';
import { UpdatePublicArticleDto } from './dto/update-public-article.dto';

@Controller('public-articles')
export class PublicArticlesController {
  constructor(private readonly publicArticlesService: PublicArticlesService) {}

  @Post()
  create(@Body() createPublicArticleDto: CreatePublicArticleDto) {
    return this.publicArticlesService.create(createPublicArticleDto);
  }

  @Get()
  findAll() {
    return this.publicArticlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicArticlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicArticleDto: UpdatePublicArticleDto) {
    return this.publicArticlesService.update(+id, updatePublicArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicArticlesService.remove(+id);
  }
}
