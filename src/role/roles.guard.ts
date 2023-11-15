import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		if (user.roles === "public") {
			return true;
		}
		const isAllowed = requiredRoles.some((role) => user.roles?.includes(role));
		if (!isAllowed) {
			throw new ForbiddenException("你没有权限访问");
		}
		if (isAllowed) {
			return true;
		}
	}
}
