import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

// @@ rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// @@ Dtos
import { UserReponseDto } from '../../user/dto/user-response.dto';

@Injectable()
export class UserTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.userTransform(data);
      }),
    );
  }

  private userTransform(data: UserReponseDto): any {
    const { _id, name, username, workouts, createdAt } = data.user;

    return {
      token: data.token,
      user: {
        id: _id,
        name,
        username,
        workouts,
        createdAt,
      },
    };
  }
}
