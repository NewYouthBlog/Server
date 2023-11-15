import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "./auth.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwtAuth") {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			// 公开的路由将role设为public
			context.switchToHttp().getRequest().user = { roles: "public" };
			return true;
		}
		return super.canActivate(context);
	}

	handleRequest<TUser = any>(err: any, user: any): TUser {
		if (err || !user) {
			throw err || new UnauthorizedException("请先登录");
		}
		return user;
	}
}
