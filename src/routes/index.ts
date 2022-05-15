import { Router, Express } from 'express';
import { ITelematicDataRoutes } from './telematicData.routes';
import { TYPE } from '../constants/type';
import { inject, injectable } from 'inversify';

const router: Router = Router();

export interface IRoutes {
  initializeRoutes(app: Express): void
}

@injectable()
export class Routes implements IRoutes {
  private telematicDataRoutes: ITelematicDataRoutes;

  constructor (
    @inject(TYPE.TelematicDataRoutes) telematicDataRoutes: ITelematicDataRoutes
  ) {
    this.telematicDataRoutes = telematicDataRoutes;
  }

  public initializeRoutes(app: Express): void {
    app.use('/api/v1', router);
    this.telematicDataRoutes.initializeTelematicRoutes(router);
  }
}
  