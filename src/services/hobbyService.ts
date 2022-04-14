import { inject, injectable } from 'inversify';
import { IDocumentUpdate, IObject } from '../common/commonInterface';
import { ERROR } from '../constants/errorMessage';
import { IDENTIFIER } from '../constants/identifier';
import { PASSION_LEVEL } from '../constants/passionLevel';
import { IHobby, IHobbyDocument } from '../models/hobbiesModel';
import { IHobbyRepository } from '../repository/hobbyRepository';
import { NotFoundError } from '../utils/errorUtil';
import { IUserService } from './userService';

export interface IHobbySearchQuery {
  user: string,
  page: number,
  limit: number
}

export interface IUpdateHobby {
  name?: string,
  passion_level?: PASSION_LEVEL,
  from?: number,
  is_deleted?: boolean
}

export interface IHobbyService {
  addHobby(hobbyData: IHobby): Promise<IHobbyDocument>;
  updateHobby(query: IObject, updateData: IUpdateHobby): Promise<IDocumentUpdate>;
}

@injectable()
export class HobbyService implements IHobbyService {

  private hobbyRepository;
  private userService;
  constructor(
    @inject(IDENTIFIER.HobbyRepository) hobbyRepository: IHobbyRepository,
    @inject(IDENTIFIER.UserService) userService: IUserService,
  ) {
    this.hobbyRepository = hobbyRepository;
    this.userService = userService
  }

  public async addHobby(hobbyData: IHobby): Promise<IHobbyDocument> {
    let user = await this.userService.getUserById(hobbyData.user);
    if (!user) {
      throw new NotFoundError(ERROR.USER_DOES_NOT_EXISTS);
    }
    return this.hobbyRepository.createHobby(hobbyData);
  }

  public async updateHobby(query: IObject, updateData: IUpdateHobby): Promise<IDocumentUpdate> {
    const hobby = await this.hobbyRepository.getHobbyById(query._id);
    if (!hobby) {
      throw new NotFoundError(ERROR.HOBBY_NOT_FOUND)
    }
    return this.hobbyRepository.updateHobby(query, updateData); 
  }

}