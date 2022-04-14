import { injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IDENTIFIER } from '../constants/identifier';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCodes';
import { IHobbyService } from '../services/hobbyService';
import { ILoggerUtil } from '../utils/loggerUtil';
import container from '../config/diConfig';
import { ObjectId } from 'bson';
import { RESPONSE } from '../constants/successMessage';

export interface IHobbyController {
  addHobbies(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateHobby(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class HobbyController implements IHobbyController {

  async addHobbies(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const hobbyService = container.get<IHobbyService>(IDENTIFIER.HobbyService);
      const hobby = await hobbyService.addHobby(req.body);
      res.send({ 
        status: HTTP_STATUS_CODES.CREATED,
        message: RESPONSE.HOBBY_ADDED, 
        data: hobby
      });
    } catch (err) {
      logger.error(`err in controller - HobbyController - addHobbies - ${err}`);
      next(err)
    }
  }

  async deleteHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const hobbyService = container.get<IHobbyService>(IDENTIFIER.HobbyService);
      const id = req.params.id;
      const data = await hobbyService.updateHobby({ _id: new ObjectId(id) }, { is_deleted: true });

      res.send({ 
        status: HTTP_STATUS_CODES.OK,
        message: RESPONSE.HOBBY_DELETED,
        data: data
      });
    } catch (err) {
      logger.error(`err in controller - HobbyController - getHobbies - ${err}`);
      next(err)
    }
  }

  async updateHobby(req: Request, res: Response, next: NextFunction): Promise<void> {
    const logger = container.get<ILoggerUtil>(IDENTIFIER.Logger);
    try { 
      const hobbyService = container.get<IHobbyService>(IDENTIFIER.HobbyService);
      const id = req.params?.id;
      const updateData = req.body || {};
      const data = await hobbyService.updateHobby({ _id: new ObjectId(id) }, updateData);
      
      res.send({ 
        status: HTTP_STATUS_CODES.OK,
        message: RESPONSE.HOBBY_UPDATED,
        data: data
      });
    } catch (err) {
      logger.error(`err in HobbyController - updateHobby - ${err}`);
      next(err)
    }
  }
   
}