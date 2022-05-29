import { injectable } from 'inversify';
import { IThreshold } from '../services/threshold.service';
import { CONSTANTS } from '../constants/common'
import { ITelematicData } from '../models/telematicData.model';

@injectable()
export class LowFuelThreshold implements IThreshold {

  public checkThreshold(telematicData: ITelematicData) {
    return telematicData.fuel_remaining.percent <= CONSTANTS.FUEL_THRESHOLD_PERCENT;
  }

}