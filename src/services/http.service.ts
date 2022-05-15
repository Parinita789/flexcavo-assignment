import express from 'express';
import { inject, injectable } from 'inversify';
import { Server, createServer } from 'http';
import CONFIG from '../config/env.config';
import { TYPE } from '../constants/type';
import { IBasicMiddleware } from '../middlewares/basic.middleware';
import { ILoggerUtil } from '../utils/logger.util';
import { InternalServerError } from '../utils/error.util';
import { IErrorHandlerMiddleware } from '../middlewares/errorHandler.middleware';
import { IRoutes } from '../routes';
 
export interface IHttpService {
  httpServer: Server;
  initializeServer(): Promise<void>;
}

@injectable()
export class HttpService implements IHttpService {
  private logger: ILoggerUtil;
  private basicMiddleware: IBasicMiddleware;
  private errorHandler: IErrorHandlerMiddleware;
  private appRoutes: IRoutes;
  public httpServer: Server;
  public app: express.Express;

  constructor(
    @inject(TYPE.Logger) logger: ILoggerUtil,
    @inject(TYPE.BasicMiddleware) basicMiddleware: IBasicMiddleware,
    @inject(TYPE.ErrorHandlerMiddleware) errorHandler: IErrorHandlerMiddleware,
    @inject(TYPE.Routes) routes: IRoutes
  ) {
    this.logger = logger;
    this.basicMiddleware = basicMiddleware;
    this.errorHandler = errorHandler;
    this.appRoutes = routes;
  }
  
  public async initializeServer(): Promise<void> {
    this.app = express();
    this.httpServer = createServer(this.app);

    this.basicMiddleware.initializeMiddlewares(this.app); // registering middlewares
    this.appRoutes.initializeRoutes(this.app); // registering routes
    this.errorHandler.handleError(this.app); // error handler middlware

    try {
      this.httpServer.listen(CONFIG.PORT, () => {
        return this.logger.info(`server listening on port: ${CONFIG.PORT}`)
      });
    } catch (err) {
      this.logger.error(`err in initializeServer: ${err}`);
      throw new InternalServerError(`err in initializeServer: ${err}`);
    }
  }
}
