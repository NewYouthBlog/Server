// 实现passport本地身份验证策略

import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "ValidateUser") {
	constructor(private readonly authService: AuthService) {
		super();
	}
	async validate(username: string, password: string) {
		const user = await this.authService.validateUser(username, password);
		if (!user) {
			throw new InternalServerErrorException();
		}
		return user;
	}
}
