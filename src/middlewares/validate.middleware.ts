import Joi from 'joi';
import { injectable } from 'inversify';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/error.util';

export interface IValidateMiddleware {
  validateBody(schema: Joi.Schema): RequestHandler;
}

@injectable()
export class ValidateMiddleware implements IValidateMiddleware {
  constructor() {}

  public validateBody(schema: Joi.Schema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = schema.validate(req.body);
        if (error) {
          throw new BadRequestError(error.message);
        }
        req.body = value;
        next();
      } catch (err) {
        next(err);
      }
    }
  }
}