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
import { GymResponseDto } from '../../gym/dto/gym-response.dto';

@Injectable()
export class GymTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.gymTransform(data);
      }),
    );
  }

  private gymTransform(data: GymResponseDto[]): any {
    const transformedData = [];

    for (const gym of data) {
      const { createdAt, _id, location, name, rating, workingHours } = gym;

      transformedData.push({
        createdAt,
        id: _id,
        location,
        name,
        rating,
        workingHours,
      });
    }

    return transformedData;
  }
}
