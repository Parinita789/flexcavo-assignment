import { injectable, inject } from 'inversify';
import mongoose from "mongoose";
import { IDENTIFIER } from  '../constants/identifier';
import { ILoggerUtil } from '../utils/loggerUtil';
import CONFIG from '../config/envConfig';

export interface IMongooseService {
  openConnection(): Promise<void>;
}

@injectable()
export class MongooseService implements IMongooseService {
  public connection: mongoose.Connection;

  private connectionOptions = {
    autoIndex: false,
    connectTimeoutMS: 180 * 1000,
    socketTimeoutMS: 180 * 1000,
    keepAlive: true,
    keepAliveInitialDelay: 10 * 1000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  private logger;
  
  constructor(
    @inject(IDENTIFIER.Logger) logger: ILoggerUtil,
  ) {
    this.logger = logger;
  }

  public async openConnection(): Promise<void> {
    await mongoose.connect(
      CONFIG.DATABASE_CONFIG.DB_CONNECTION_STRING,
      this.connectionOptions,
    );

    mongoose.connection.on('connected', () => {
      this.logger.info('Mongoose connection established');
    }); 

    mongoose.connection.on('disconnected', () => {
      this.logger.info('Mongoose connection lost');
    });

    mongoose.connection.on('reconnected', () => {
      this.logger.info('Mongoose connection reestablished');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Mongoose connection error ${err}`);
    });;
  }
}
