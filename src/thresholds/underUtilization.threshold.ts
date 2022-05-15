import { injectable } from 'inversify';
import { ITelematicData } from '../models/telematicData.model';
import { IThreshold } from '../services/threshold.service';

@injectable()
export class UnderUtilizationThreshold implements IThreshold {

  public checkThreshold(telematicData: ITelematicData) {
    return Math.round(Math.round(telematicData.cumulative_idle_hours.hour) / Math.round(telematicData.cumulative_operating_hours.hour)) === 3
  }

}