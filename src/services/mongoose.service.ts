import { injectable, inject } from 'inversify';
import mongoose from "mongoose";
import { TYPE } from  '../constants/type';
import { ILoggerUtil } from '../utils/logger.util';
import CONFIG from '../config/env.config';

export interface IMongooseService {
  openConnection(): Promise<void>;
}

@injectable()
export class MongooseService implements IMongooseService {
  public connection: mongoose.Connection;
  private logger;
  private connectionOptions = {
    autoIndex: false,
    connectTimeoutMS: 180 * 1000,
    socketTimeoutMS: 180 * 1000,
    keepAlive: true,
    keepAliveInitialDelay: 10 * 1000,
  };
  
  constructor(
    @inject(TYPE.Logger) logger: ILoggerUtil,
  ) {
    this.logger = logger;
  }

  public async openConnection(): Promise<void> {
    await mongoose.connect(
      CONFIG.DATABASE_CONFIG.DB_CONNECTION_STRING,
      this.connectionOptions,
    );

    mongoose.connection.on('connected', () => {
      this.logger.info('Database connection established');
    }); 

    mongoose.connection.on('disconnected', () => {
      this.logger.info('Database connection lost');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Database connection error ${err}`);
    });;
  }
}
