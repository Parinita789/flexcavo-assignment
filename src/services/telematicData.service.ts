import { inject, injectable } from 'inversify';
import { TYPE } from '../constants/type';
import { ITelematicData, ITelematicDataDocument } from '../models/telematicData.model';
import { ITelematicDataRepository } from '../repository/telematicData.repository';
import { IThreshold, IThresholdChecker } from './threshold.service';

export interface ITelematicDataService {
  saveTelematicData(TelematicData: ITelematicData): Promise<ITelematicDataDocument>;
  checkTelematicDataThreshold(telematicData: ITelematicData): string;
}

@injectable()
export class TelematicDataService implements ITelematicDataService {
  private telematicDataRepository: ITelematicDataRepository;
  private thresholdChecker: IThresholdChecker;

  constructor(
    @inject(TYPE.TelematicDataRepository) telematicDataRepository: ITelematicDataRepository,
    @inject(TYPE.ThresholdChecker) thresholdChecker: IThresholdChecker,
  ) {
    this.telematicDataRepository = telematicDataRepository;
    this.thresholdChecker = thresholdChecker
  }

  public async saveTelematicData(telematicData: ITelematicData): Promise<ITelematicDataDocument> { 
    // save in the DB
    return await this.telematicDataRepository.saveTelematicData(telematicData);
  }

  public checkTelematicDataThreshold(telematicData: ITelematicData): string {
    // threshold check logic
    return this.thresholdChecker.checkAllThreshold(telematicData);

  }
}