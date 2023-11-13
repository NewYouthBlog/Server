import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicArticleDto } from './create-public-article.dto';

export class UpdatePublicArticleDto extends PartialType(CreatePublicArticleDto) {}
