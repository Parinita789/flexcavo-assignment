import { inject, injectable } from 'inversify';
import { Router } from 'express';
import { IHobbyController } from '../controllers/hobbyController';
import { hobbySchema, updateHobbySchema } from '../schemas/hobbySchema';
import { IValidateMiddleware } from '../middlewares/validateMiddleware';
import { IDENTIFIER } from '../constants/identifier';

export interface IHobbyRoutes {
  initializeHobbyRoutes(router: Router): void
}

@injectable()
export class HobbyRoutes implements IHobbyRoutes {

  private validateMiddleware;
  private hobbyController;

  constructor (
    @inject(IDENTIFIER.ValidateMiddleware) validateMiddleware: IValidateMiddleware,
    @inject(IDENTIFIER.HobbyController) hobbyController: IHobbyController
  ) {
    this.validateMiddleware = validateMiddleware;
    this.hobbyController = hobbyController;
  }

  public initializeHobbyRoutes(router: Router): void {
    router.post('/hobby', this.validateMiddleware.validateBody(hobbySchema),  this.hobbyController.addHobbies);
    router.put('/hobby/:id', this.validateMiddleware.validateBody(updateHobbySchema), this.validateMiddleware.validateId(), this.hobbyController.updateHobby);
    router.delete('/hobby/:id', this.validateMiddleware.validateId(), this.hobbyController.deleteHobby);
  }
}