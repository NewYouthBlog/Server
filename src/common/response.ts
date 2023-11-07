import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

interface Data<T> {
	data: T;
}

@Injectable()
export class response<T> implements NestInterceptor {
	intercept(_context: any, next: CallHandler): Observable<Data<T>> {
		return next.handle().pipe(
			map((data) => {
				return {
					data,
					code: 0,
					message: "success",
				};
			}),
		);
	}
}
