import { injectable } from 'inversify';
import { CONSTANTS } from '../constants/common';
import { ITelematicData } from '../models/telematicData.model';
import { IThreshold } from '../services/threshold.service';

@injectable()
export class UnderUtilizationThreshold implements IThreshold {

  public checkThreshold(telematicData: ITelematicData) {
    return telematicData.cumulative_operating_hours.hour / telematicData.cumulative_idle_hours.hour < CONSTANTS.UNDER_UTILIZATION_RATIO;
  }

}