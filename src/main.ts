import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { response } from "./common/response";
import { errfitter } from "./common/errfitter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalInterceptors(new response());
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new errfitter());
	await app.listen(3001);
}
bootstrap();
