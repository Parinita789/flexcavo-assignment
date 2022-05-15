import container from './config/inversify.config';
import { TYPE } from './constants/type';
import { IApplication } from './services/app.service';

// Start application
container.get<IApplication>(TYPE.Application).initializeApplication();