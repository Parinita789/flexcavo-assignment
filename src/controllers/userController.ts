import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IDENTIFIER } from '../constants/identifier';
import { IUserService } from '../services/userService';
import { ILoggerUtil } from '../utils/loggerUtil';
import container from '../config/diConfig';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { ISearchQuery } from '../common/commonInterface';
import { ObjectId } from 'bson';
import { RESPONSE } from '../constants/successMessage';

export interface IUserController {
  registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class UserController implements IUserController {

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const userService = container.get<IUserService>(IDENTIFIER.UserService);
      await userService.createUser(req.body);

      res.send({ 
        status: HTTP_STATUS_CODES.OK,
        message: RESPONSE.USER_CREATED
      });
    } catch (err) {
      logger.error(`err in UserController - registerUser - ${err}`);
      next(err)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const userService = container.get<IUserService>(IDENTIFIER.UserService);
      const searchQuery: ISearchQuery = {
        baseQuery: { is_deleted: false },
        filterQuery: {
          select: { first_name: 1, last_name: 1 },
          limit: req?.query?.limit ? Number(req.query.limit) : 10,
          skip: req?.query?.page ? (Number(req.query.page) * (Number(req.query.limit) || 10)): 0,
        }
      }

      const data = await userService.getUsers(searchQuery);

      console.log("data >>>>> ", data)
      
      res.send({ 
        status: HTTP_STATUS_CODES.OK,
        message: RESPONSE.USERS_FOUND, 
        data: data
      });
    } catch (err) {
      logger.error(`err in UserController - getUsers - ${err}`);
      next(err)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const userService = container.get<IUserService>(IDENTIFIER.UserService);
      const userId = req.params.id;
      const updateData = req.body.updateData;
       
      const updatedUser = await userService.updateUserById({ _id: userId }, updateData )
      res.send({ 
        status: HTTP_STATUS_CODES.OK,
        message: RESPONSE.USER_UPDATED, 
        data: updatedUser
      });
    } catch (err) {
      logger.error(`err in UserController - updateUser - ${err}`);
      next(err)
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const userService = container.get<IUserService>(IDENTIFIER.UserService);
      const userId = req.params.id;
      const updatedUser = await userService.updateUserById({ _id: userId }, { is_deleted: true } )

      res.send({ 
        status: HTTP_STATUS_CODES.OK,
        message: RESPONSE.USER_DELETED,
        data: updatedUser
      });
    } catch (err) {
      logger.error(`err in UserController - deleteUser - ${err}`);
      next(err)
    }
  }
  
  async getUserHobbies(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const userService = container.get<IUserService>(IDENTIFIER.UserService);
      const userId = req.params?.id;
      const hobbies = await userService.getUserHobbies(new ObjectId(userId));

      res.send({ 
        status: HTTP_STATUS_CODES.OK,
        message: RESPONSE.USER_HOBBIES_FETCHED, 
        data: hobbies
      });

    } catch (err) {
      logger.error(`err in UserController - getUserHobbies - ${err}`);
      next(err)
    }
  }
   
}