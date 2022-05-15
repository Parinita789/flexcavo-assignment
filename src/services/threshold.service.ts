
import { inject, injectable } from 'inversify';
import { TYPE } from '../constants/type';
import { ITelematicData } from '../models/telematicData.model';

export interface IThreshold {
  checkThreshold(telematicData): boolean;
}

export interface IThresholdChecker {
  checkAllThreshold(telematicData: ITelematicData): string;
}

@injectable()
export class ThresholdChecker implements IThresholdChecker {
  private thresholds = [];

  constructor(
    @inject(TYPE.LowFuelThreshold) lowFuelThreshold: IThreshold,
    @inject(TYPE.UnderUtilizationThreshold) underUtilizationThreshold: IThreshold,
    @inject(TYPE.OperatedOutOfHoursThreshold) operatedOutOfHoursThreshold: IThreshold,
    @inject(TYPE.OdodmeterUpperLimitThreshold) ododmeterUpperLimitThreshold: IThreshold
  ) {
    this.thresholds = [
      underUtilizationThreshold,
      operatedOutOfHoursThreshold,
      lowFuelThreshold,
      ododmeterUpperLimitThreshold
    ];
  }

  public checkAllThreshold(telematicData: ITelematicData): string {
    let thresholdsReached: string = '';
    for (let threshold of this.thresholds) {
      const isThresholdReached = threshold.checkThreshold(telematicData);
      if (isThresholdReached) {
        thresholdsReached += ` ${threshold.constructor.name}`;
      }
    }
    return thresholdsReached;;
  }

}

