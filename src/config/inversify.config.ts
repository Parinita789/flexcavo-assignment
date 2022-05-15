import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPE } from '../constants/type';
import { HttpService, IHttpService } from '../services/http.service';
import { Application, IApplication } from '../services/app.service';
import { BasicMiddleware, IBasicMiddleware } from '../middlewares/basic.middleware';
import { ErrorHandlerMiddleware, IErrorHandlerMiddleware } from '../middlewares/errorHandler.middleware';
import { IValidateMiddleware, ValidateMiddleware } from '../middlewares/validate.middleware';
import { IRoutes, Routes } from '../routes';
import { ITelematicDataRoutes, TelematicDataRoutes } from '../routes/telematicData.routes';
import { TelematicDataController, ITelematicDataController } from '../controllers/telematicData.controller';
import { LoggerUtil, ILoggerUtil } from '../utils/logger.util';
import { IMongooseService, MongooseService } from '../services/mongoose.service';
import { ITelematicDataService, TelematicDataService } from '../services/telematicData.service';
import { ITelematicDataRepository, TelematicDataRepository } from '../repository/telematicData.repository';
import { IThresholdChecker, ThresholdChecker, IThreshold } from '../services/threshold.service';
import { LowFuelThreshold } from '../thresholds/lowFuel.threshold';
import { UnderUtilizationThreshold } from '../thresholds/underUtilization.threshold';
import { OperatedOutOfHoursThreshold } from '../thresholds/operatedOutOfHours.threshold';
import { OdodmeterUpperLimitThreshold } from '../thresholds/odometerUpperLimit.threshold'; 

const container = new Container({ defaultScope: 'Singleton' });

/**
* service bindings
*/
container.bind<IHttpService>(TYPE.HttpService).to(HttpService).inSingletonScope();
container.bind<ILoggerUtil>(TYPE.Logger).to(LoggerUtil).inSingletonScope();
container.bind<IApplication>(TYPE.Application).to(Application).inSingletonScope();
container.bind<IMongooseService>(TYPE.MongooseService).to(MongooseService).inSingletonScope();
container.bind<ITelematicDataService>(TYPE.TelematicDataService).to(TelematicDataService).inRequestScope();
container.bind<IThresholdChecker>(TYPE.ThresholdChecker).to(ThresholdChecker).inRequestScope();

/**
* middleware binding
*/ 
container.bind<IBasicMiddleware>(TYPE.BasicMiddleware).to(BasicMiddleware).inSingletonScope();
container.bind<IErrorHandlerMiddleware>(TYPE.ErrorHandlerMiddleware).to(ErrorHandlerMiddleware).inSingletonScope();
container.bind<IValidateMiddleware>(TYPE.ValidateMiddleware).to(ValidateMiddleware).inSingletonScope();

/**
 * repository bindings
 */
container.bind<ITelematicDataRepository>(TYPE.TelematicDataRepository).to(TelematicDataRepository).inRequestScope();

/**
 * controller bindings
 */
container.bind<ITelematicDataController>(TYPE.TelematicDataController).to(TelematicDataController).inRequestScope();

/**
 * Route bindings
 */
container.bind<IRoutes>(TYPE.Routes).to(Routes).inSingletonScope();
container.bind<ITelematicDataRoutes>(TYPE.TelematicDataRoutes).to(TelematicDataRoutes).inSingletonScope();

/**
 * Threshold bindings
 */
 container.bind<IThreshold>(TYPE.LowFuelThreshold).to(LowFuelThreshold).inSingletonScope();
 container.bind<IThreshold>(TYPE.UnderUtilizationThreshold).to(UnderUtilizationThreshold).inSingletonScope();
 container.bind<IThreshold>(TYPE.OperatedOutOfHoursThreshold).to(OperatedOutOfHoursThreshold).inSingletonScope();
 container.bind<IThreshold>(TYPE.OdodmeterUpperLimitThreshold).to(OdodmeterUpperLimitThreshold).inSingletonScope();

export default container;
