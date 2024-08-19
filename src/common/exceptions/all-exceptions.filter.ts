import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// @@ Utils
import { getErrLogMsg } from '../utils/helperFunctions';

const DEFAULT_ERR_MSG = 'Internal server error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Excetption found.'); // delete in PROD.

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException
        ? exception.getResponse()
        : DEFAULT_ERR_MSG;

    if (status !== HttpStatus.BAD_REQUEST && status !== HttpStatus.NOT_FOUND) {
      const errLogMsg = getErrLogMsg(status, msg);
      console.error(errLogMsg);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
