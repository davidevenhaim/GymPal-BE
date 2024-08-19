import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    console.log(
      `Request received - with METHOD: ${req.method} -- To URL: ${req.url}`,
    );

    const timeBeforeRequest = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `Request with Method: ${req.method} -- To URL: ${req.url} took ${Date.now() - timeBeforeRequest}ms to be completed.`,
          ),
        ),
      );
  }
}
