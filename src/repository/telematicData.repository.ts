import { injectable } from 'inversify';
import { ITelematicData, ITelematicDataDocument, TelematicDataModel } from '../models/telematicData.model';

export interface ITelematicDataRepository {
  saveTelematicData(telematicData: ITelematicData): Promise<ITelematicDataDocument>;
}

@injectable()
export class TelematicDataRepository implements ITelematicDataRepository {

  public async saveTelematicData(telematicData: ITelematicData): Promise<ITelematicDataDocument> {
    return TelematicDataModel.create(telematicData);
  }

}