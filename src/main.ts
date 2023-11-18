import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { response } from "./common/response";
import { errfitter } from "./common/errfitter";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.disable("x-powered-by");
	app.enableCors();
	app.useGlobalInterceptors(new response());
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new errfitter());
	await app.listen(3001);
}
bootstrap();
