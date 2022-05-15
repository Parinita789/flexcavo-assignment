import { Express } from 'express';
import bodyParser from 'body-parser';
import { injectable, inject } from 'inversify';
import { CONSTANTS } from '../constants/common';
import { TYPE } from '../constants/type';
import { ILoggerUtil } from '../utils/logger.util';

export interface IBasicMiddleware {
  initializeMiddlewares(app: Express): Promise<void>;
}

@injectable()
export class BasicMiddleware { 
  private logger;
  
  constructor (
    @inject(TYPE.Logger) logger: ILoggerUtil,
  ) {
    this.logger = logger;
  }

  public async initializeMiddlewares(app: Express): Promise<void> {
    try {  
      app.use(bodyParser.json({
        limit : CONSTANTS.BODY_LIMIT
      })); 
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}