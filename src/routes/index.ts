import { Router, Express } from 'express';
import { IHobbyRoutes } from './hobbyRoutes';
import { IUserRoutes } from './userRoutes';
import { IDENTIFIER } from '../constants/identifier';
import { inject, injectable } from 'inversify';

const router: Router = Router();

export interface IRoutes {
  initializeRoutes(app: Express): void
}

@injectable()
export class Routes implements IRoutes {
  private hobbyRoutes;
  private userRoutes;

  constructor (
    @inject(IDENTIFIER.HobbyRoutes) hobbyRoutes: IHobbyRoutes,
    @inject(IDENTIFIER.UserRoutes) userRoutes: IUserRoutes,
  ) {
    this.hobbyRoutes = hobbyRoutes;
    this.userRoutes = userRoutes;
  }

  public initializeRoutes(app: Express): void {
    app.use('/api/v1', router);
    this.userRoutes.initializeUserRoutes(router);
    this.hobbyRoutes.initializeHobbyRoutes(router);
  }
}
  