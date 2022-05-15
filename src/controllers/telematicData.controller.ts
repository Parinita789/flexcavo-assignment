import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { TYPE } from '../constants/type';
import { ITelematicDataService } from '../services/telematicData.service';
import { ILoggerUtil } from '../utils/logger.util';
import container from '../config/inversify.config';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { RESPONSE } from '../constants/successMessage';

export interface ITelematicDataController {
  processTelematicData(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class TelematicDataController implements ITelematicDataController {

  async processTelematicData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(TYPE.Logger);
    try { 
      /** 
      * If the ingestion rate is too high, for speeding up the process we can only validate and publish the data to the queue.
      * Acknowledge the service with the accepted response.
      * onsume data asynchronously from the queue, check thresholds and saved inthe db.
      */
    
      const telematicService = container.get<ITelematicDataService>(TYPE.TelematicDataService);
      const thresholdsReached = telematicService.checkTelematicDataThreshold(req.body);
      if (thresholdsReached?.length) {
        logger.warn(thresholdsReached);
      }
      const data = await telematicService.saveTelematicData(req.body);

      res.send({ 
        status: HTTP_STATUS_CODES.CREATED,
        message: RESPONSE.TELEMATIC_DATA_ADDED,
        data: data
      });

    } catch (err) {
      console.log(" err >>>> ", err)
      logger.error(err);
      next(err)
    }
  }
  
}