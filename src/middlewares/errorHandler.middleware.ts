import { injectable } from 'inversify';
import { Express } from 'express';
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';

export interface IErrorHandlerMiddleware {
  handleError(app: Express): void
}

@injectable()
export class ErrorHandlerMiddleware {

  private getHttpStatusCode (err) {
    let status;
    const instanceOf = err.constructor.name
    switch (instanceOf) {
      case 'BadRequestError':
        status = HTTP_STATUS_CODES.BAD_REQUEST; 
        break;
      case 'DuplicateError':
        status = HTTP_STATUS_CODES.DUPLICATE; 
        break;
      case 'NotFoundError':
        status = HTTP_STATUS_CODES.NOT_FOUND; 
        break;             
      default:
        status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    }
    return status;
  }

  public handleError(app: Express): void {
    app.use((err, req: Request, res: Response, next: NextFunction) => {
      const status = this.getHttpStatusCode(err);
      res.status(status).json({
        status: status,
        message: err.message, 
      })
    })
  }

}
