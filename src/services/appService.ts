import { inject, injectable } from 'inversify';
import { IDENTIFIER } from '../constants/identifier';
import { ILoggerUtil } from '../utils/loggerUtil';
import { IHttpService } from '../services/httpService';
import { IMongooseService } from './mongooseService';

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
    @inject(IDENTIFIER.Logger) logger: ILoggerUtil,
    @inject(IDENTIFIER.HttpService) httpService: IHttpService,
    @inject(IDENTIFIER.MongooseService) mongooseService: IMongooseService,
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
      this.logger.info('Application Started');
    } catch (error) {
      this.logger.error(`error in applicationService initializeApplication - ${error}`);
      this.gracefulShutdown();
    }
  }

  public gracefulShutdown(): void {
    this.httpService.httpServer.close(() => {
      process.exit(1);
    })
  }
}