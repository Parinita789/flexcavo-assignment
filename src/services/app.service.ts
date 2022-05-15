import { inject, injectable } from 'inversify';
import { TYPE } from '../constants/type';
import { ILoggerUtil } from '../utils/logger.util';
import { IHttpService } from './http.service';
import { IMongooseService } from './mongoose.service';

export interface IApplication {
  initializeApplication(): Promise<void>;
  gracefulShutdown(): void;
}

@injectable()
export class Application implements IApplication { 
  private logger;
  private httpService;
  private mongooseService;

  constructor(
    @inject(TYPE.Logger) logger: ILoggerUtil,
    @inject(TYPE.HttpService) httpService: IHttpService,
    @inject(TYPE.MongooseService) mongooseService: IMongooseService,
  ) {
    this.logger = logger;
    this.httpService = httpService;
    this.mongooseService = mongooseService;
  }

  public async initializeApplication(): Promise<void> {
    try {  
      await Promise.all([
        this.httpService.initializeServer(),
        this.mongooseService.openConnection(),
      ])
      this.logger.info('Application Up and Running');
    } catch (err) {
      this.logger.error(`error in initializeApplication: ${err}`);
      this.gracefulShutdown();
    }
  }

  public gracefulShutdown(): void {
    this.httpService.httpServer.close(() => {
      process.exit(1);
    })
  }

}