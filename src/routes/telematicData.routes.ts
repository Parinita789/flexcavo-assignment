import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPE } from '../constants/type';
import { IValidateMiddleware } from '../middlewares/validate.middleware';
import { ITelematicDataController } from '../controllers/telematicData.controller';
import { telematicDataSchema } from '../schemas/telematicData.schema';

export interface ITelematicDataRoutes {
  initializeTelematicRoutes(router: Router): void
}

@injectable()
export class TelematicDataRoutes implements ITelematicDataRoutes {

  private validateMiddleware: IValidateMiddleware;
  private telematicDataController: ITelematicDataController;
  
  constructor (
    @inject(TYPE.ValidateMiddleware) validateMiddleware: IValidateMiddleware,
    @inject(TYPE.TelematicDataController) telematicDataController: ITelematicDataController,
  ) {
    this.validateMiddleware = validateMiddleware;
    this.telematicDataController = telematicDataController;
  }

  public initializeTelematicRoutes(router: Router): void {
    router.post('/telematic-data', this.validateMiddleware.validateBody(telematicDataSchema), this.telematicDataController.processTelematicData);
  }
}

