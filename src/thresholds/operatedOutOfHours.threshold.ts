import { injectable } from 'inversify';
import { CONSTANTS } from '../constants/common';
import { ITelematicData } from '../models/telematicData.model';
import { IThreshold } from '../services/threshold.service';

@injectable()
export class OperatedOutOfHoursThreshold implements IThreshold {
  
  public checkThreshold(telematicData: ITelematicData): boolean {
    // check if engine running status was true on weekends
    const currentDate = new Date();
    let isWeekend: boolean = currentDate.getDay() === CONSTANTS.SATURDAY || currentDate.getDay() === CONSTANTS.SUNDAY;
    return isWeekend && telematicData.engine_status.running;
  }

}