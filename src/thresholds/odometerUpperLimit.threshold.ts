import { injectable } from 'inversify';
import { ITelematicData } from '../models/telematicData.model';
import { IThreshold } from '../services/threshold.service';
import { CONSTANTS } from '../constants/common';

@injectable()
export class OdodmeterUpperLimitThreshold implements IThreshold {
  
  public checkThreshold(telematicData: ITelematicData): boolean {
    return telematicData.distance.odometer > CONSTANTS.ODOMETER_UPPER_LIMIT;
  }

}