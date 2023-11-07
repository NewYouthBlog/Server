import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { response } from "./common/response";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new response());
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3001);
}
bootstrap();
