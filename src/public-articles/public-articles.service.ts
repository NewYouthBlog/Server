import { Injectable } from '@nestjs/common';
import { CreatePublicArticleDto } from './dto/create-public-article.dto';
import { UpdatePublicArticleDto } from './dto/update-public-article.dto';

@Injectable()
export class PublicArticlesService {
  create(createPublicArticleDto: CreatePublicArticleDto) {
    return 'This action adds a new publicArticle';
  }

  findAll() {
    return `This action returns all publicArticles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicArticle`;
  }

  update(id: number, updatePublicArticleDto: UpdatePublicArticleDto) {
    return `This action updates a #${id} publicArticle`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicArticle`;
  }
}
