import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class PublicArticlesService {
  constructor(private prisma: PrismaService) {}
  async findAll(status = 1, page = 1, limit: number = null) {
    if (limit) {
      // 当前页
      const skip = (page - 1) * limit;
      const articles = await this.prisma.article.findMany({
        where: { status: status },
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: { tags: true },
        // select: { id: true, title: true, image: true, tags: true },
      });
      const total = await this.prisma.article.count({
        where: { status },
      });
      return { articles, total };
    } else {
      const articles = await this.prisma.article.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: { id: true, title: true },
      });
      return { articles };
    }
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: id,
      },
      include: {
        tags: true,
      },
    });
    return article;
  }

  async findArticleByTag(
    tagname: string,
    status = 1,
    page = 1,
    limit: number = null,
  ) {
    const tag = await this.prisma.tag.findFirst({
      where: {
        name: tagname,
      },
    });

    if (!tag) {
      throw new BadRequestException("标签未找到");
    } // 如果没有找到标签

    const skip = (page - 1) * limit;

    const articles = await this.prisma.article.findMany({
      where: {
        status: status,
        tags: { some: { id: tag.id } }, // 根据标签 ID 过滤
      },
      skip: limit ? skip : undefined,
      take: limit ? limit : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: { tags: true },
    });

    const total = await this.prisma.article.count({
      where: { status },
    });
    return { articles, total };
  }

  async findHeadline() {
    return {
      articles: await this.prisma.article.findMany({
        where: {
          AND: [{ status: 1 }, { HeadImg: { not: "" } }],
        },
      }),
    };
  }

  // 归档文章查询，根据时间排序
  async findArchive() {
    type GroupedArticle = {
      year: number;
      month: number;
      articles: {
        id: number; // 假设 id 是数字
        title: string;
        createdAt: Date; // 或者使用 string，视你的数据结构而定
      }[];
    };

    const articles = await this.prisma.article.findMany({
      where: {
        status: 1,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    // 按年、月分组
    const groupedArticles = articles.reduce<Record<string, GroupedArticle>>(
      (acc, article) => {
        const date = new Date(article.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份从 0 开始

        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = {
            year,
            month,
            articles: [],
          };
        }

        acc[key].articles.push({
          id: article.id,
          title: article.title,
          createdAt: article.createdAt,
        });

        return acc;
      },
      {},
    );

    // 将结果转换为数组并按年月排序
    const sortedResults = Object.values(groupedArticles).sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.month - a.month;
    });
    return sortedResults;
  }
}
