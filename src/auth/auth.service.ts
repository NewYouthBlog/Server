import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}
	async validateUser(username: string, password: string) {
		const user = await this.userService.findOneByUsername(username);
		if (!user) {
			throw new UnauthorizedException("用户不存在");
		}
		if (user && user.password !== password) {
			throw new UnauthorizedException("密码错误");
		}
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
	// 发放token
	async realseToken(user: User) {
		const payload = { username: user.username, sub: user.id };
		return {
			Token: this.jwtService.sign(payload),
		};
	}
}
