import 'reflect-metadata';
import { Container } from 'inversify';
import { IDENTIFIER } from '../constants/identifier';
import { HttpService, IHttpService } from '../services/httpService';
import { Application, IApplication } from '../services/appService';
import { BasicMiddleware, IBasicMiddleware } from '../middlewares/basicMiddleware';
import { ErrorHandlerMiddleware, IErrorHandlerMiddleware } from '../middlewares/errorHandlerMiddleware';
import { IValidateMiddleware, ValidateMiddleware } from '../middlewares/validateMiddleware';
import { UserController, IUserController } from '../controllers/userController';
import { LoggerUtil, ILoggerUtil } from '../utils/loggerUtil';
import { IMongooseService, MongooseService } from '../services/mongooseService';
import { IUserService, UserService } from '../services/userService';
import { IUserRepository, UserRepository } from '../repository/userRepository';
import { IHobbyRepository, HobbyRepository } from '../repository/hobbyRepository';
import { IHobbyService, HobbyService } from '../services/hobbyService';
import { IHobbyController, HobbyController } from '../controllers/hobbyController';
import { IRoutes, Routes } from '../routes';
import { IHobbyRoutes, HobbyRoutes } from '../routes/hobbyRoutes';
import { IUserRoutes, UserRoutes } from '../routes/userRoutes';

const container = new Container({ defaultScope: 'Singleton' });

/**
* service bindings
*/
container.bind<IHttpService>(IDENTIFIER.HttpService).to(HttpService).inSingletonScope();
container.bind<ILoggerUtil>(IDENTIFIER.Logger).to(LoggerUtil).inSingletonScope();
container.bind<IApplication>(IDENTIFIER.Application).to(Application).inSingletonScope();
container.bind<IMongooseService>(IDENTIFIER.MongooseService).to(MongooseService).inSingletonScope();
container.bind<IUserService>(IDENTIFIER.UserService).to(UserService).inSingletonScope();
container.bind<IHobbyService>(IDENTIFIER.HobbyService).to(HobbyService).inSingletonScope();

/**
* middleware binding
*/ 
container.bind<IBasicMiddleware>(IDENTIFIER.BasicMiddleware).to(BasicMiddleware).inSingletonScope();
container.bind<IErrorHandlerMiddleware>(IDENTIFIER.ErrorHandlerMiddleware).to(ErrorHandlerMiddleware).inSingletonScope();
container.bind<IValidateMiddleware>(IDENTIFIER.ValidateMiddleware).to(ValidateMiddleware).inSingletonScope();

/**
 * repository bindings
 */
container.bind<IUserRepository>(IDENTIFIER.UserRepository).to(UserRepository).inSingletonScope();
container.bind<IHobbyRepository>(IDENTIFIER.HobbyRepository).to(HobbyRepository).inSingletonScope();

/**
 * controller bindings
 */
container.bind<IUserController>(IDENTIFIER.UserController).to(UserController).inSingletonScope();
container.bind<IHobbyController>(IDENTIFIER.HobbyController).to(HobbyController).inSingletonScope();

/**
 * Route bindings
 */
container.bind<IRoutes>(IDENTIFIER.Routes).to(Routes).inSingletonScope();
container.bind<IHobbyRoutes>(IDENTIFIER.HobbyRoutes).to(HobbyRoutes).inSingletonScope();
container.bind<IUserRoutes>(IDENTIFIER.UserRoutes).to(UserRoutes).inSingletonScope();

export default container;
