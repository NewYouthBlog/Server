import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { PublicApi } from "./auth/auth.decorator";

@Controller()
@PublicApi()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
