import { Module } from '@nestjs/common';
import { PublicArticlesService } from './public-articles.service';
import { PublicArticlesController } from './public-articles.controller';

@Module({
  controllers: [PublicArticlesController],
  providers: [PublicArticlesService],
})
export class PublicArticlesModule {}
