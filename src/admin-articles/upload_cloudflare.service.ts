// src/upload/upload.service.ts
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  constructor(private readonly configService: ConfigService) {
    // 初始化 S3 客户端，指向 Cloudflare R2
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${this.configService.get("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.configService.get("R2_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.get("R2_SECRET_ACCESS_KEY"),
      },
      forcePathStyle: true, // <--- 必须设为 true

      // 【关键修复】禁用 S3 Express 导致的 x-id 参数
      // 告诉 SDK 这是一个通用的 S3 兼容服务，不要加戏
      disableMultiregionAccessPoints: true,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    // 1. 生成唯一文件名 (防止同名覆盖)
    const uniqueFileName = `${uuidv4()}.${file.originalname.split(".").pop()}`;

    // 2. 构造上传命令
    const command = new PutObjectCommand({
      Bucket: this.configService.get("R2_BUCKET_NAME"),
      Key: uniqueFileName,
      Body: file.buffer, // 文件内容
      ContentType: file.mimetype, // 文件的 MIME 类型
    });

    try {
      // 3. 发送上传请求
      await this.s3Client.send(command);

      // 4. 拼接并返回公开访问链接
      // 注意：R2 SDK 不会直接返回公网 URL，需要自己拼接自定义域名
      const publicUrl = `${this.configService.get("R2_PUBLIC_DOMAIN")}/${uniqueFileName}`;

      return {
        url: publicUrl,
        key: uniqueFileName,
      };
    } catch (error) {
      console.error("R2 Upload Error:", error);
      throw new InternalServerErrorException("图片上传失败");
    }
  }
}
