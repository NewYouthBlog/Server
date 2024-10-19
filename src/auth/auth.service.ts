import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}
	async validateUser(username: string, password: string) {
		const user = await this.userService.findOneByUsername(username);
		if (!user) {
			throw new HttpException("用户不存在", HttpStatus.FORBIDDEN);
		}
		if (user && user.password !== password) {
			throw new HttpException("密码错误", HttpStatus.FORBIDDEN);
		}
		if (user && user.password === password) {
			return user;
		}
		return null;
	}
	// 发放token
	async realseToken(user: any) {
		const payload = { username: user.username, sub: String(user.id), roles: user.role };
		return {
			Token: this.jwtService.sign(payload),
		};
	}
}
