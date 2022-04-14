import Joi from 'joi';
import { injectable } from 'inversify';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/errorUtil';
import { ERROR } from '../constants/errorMessage';

export interface IValidateMiddleware {
  validateBody(schema: Joi.Schema): RequestHandler;
  validateId(): RequestHandler
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

  public validateId(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        if (!id) {
          throw new BadRequestError(ERROR.ID_REQUIRED);
        }
  
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          throw new BadRequestError(ERROR.ID_NOT_VALID);
        }
        next();
      } catch (err) {
        next(err);
      }
    }
  }
}