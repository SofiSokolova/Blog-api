import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';

@Catch(HttpException, UniqueConstraintError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | UniqueConstraintError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let errMessage: string;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errMessage = exception.getResponse()['message'];
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errMessage = exception.errors[0].message;
    }

    response.status(status).json({
      statusCode: status,
      message: errMessage,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
