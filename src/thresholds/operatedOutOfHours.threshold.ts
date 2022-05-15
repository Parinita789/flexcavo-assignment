import { injectable } from 'inversify';
import { ITelematicData } from '../models/telematicData.model';
import { IThreshold } from '../services/threshold.service';

@injectable()
export class OperatedOutOfHoursThreshold implements IThreshold {
  
  public checkThreshold(telematicData: ITelematicData): boolean {
    // check if engine running status was true on weekends
    const currentDate = new Date();
    let isWeekend: boolean = false;
    if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
      isWeekend = true;
    } 
    return (isWeekend && telematicData.engine_status.running) ? true : false;
  }

}