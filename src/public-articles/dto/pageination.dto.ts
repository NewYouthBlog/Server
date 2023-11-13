import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	@Min(1)
	limit: number;

	@IsOptional()
	@IsPositive()
	@Type(() => Number)
	@Min(0)
	page: number;

	@IsOptional()
	@Type(() => Number)
	@IsIn([-1, 1])
	status: number;
}
