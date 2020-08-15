import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException): any {
    const status = exception.getStatus();
    switch (status) {
      case 400:
        return new UserInputError(exception.getResponse()['message']);
      default:
        return new Error('Server Error');
    }
  }
}
