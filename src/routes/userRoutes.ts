import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { IDENTIFIER } from '../constants/identifier';
import { IValidateMiddleware } from '../middlewares/validateMiddleware';
import { IUserController } from '../controllers/userController';
import { userSchema, updateUserSchema } from '../schemas/userSchema';

export interface IUserRoutes {
  initializeUserRoutes(router: Router): void
}

@injectable()
export class UserRoutes implements IUserRoutes {

  private validateMiddleware;
  private userController;
  private hobbyController;
  
  constructor (
    @inject(IDENTIFIER.ValidateMiddleware) validateMiddleware: IValidateMiddleware,
    @inject(IDENTIFIER.UserController) userController: IUserController,
    @inject(IDENTIFIER.HobbyController) hobbyController: IUserController,
  ) {
    this.validateMiddleware = validateMiddleware;
    this.userController = userController;
    this.hobbyController = hobbyController;
  }

  public initializeUserRoutes(router: Router): void {
    router.post('/user', this.validateMiddleware.validateBody(userSchema), this.userController.registerUser);
    router.get('/users', this.userController.getUsers);
    router.put('/user/:id', this.validateMiddleware.validateBody(updateUserSchema), this.validateMiddleware.validateId(), this.userController.updateUser);
    router.delete('/user/:id', this.validateMiddleware.validateId(), this.userController.deleteUser);
    router.get('/user/:id/hobby', this.validateMiddleware.validateId(), this.userController.getUserHobbies)
  }
}


