import { ObjectId } from 'bson';
import { inject, injectable } from 'inversify';
import { IDocumentUpdate, IObject, IPagination, ISearchQuery } from '../common/commonInterface';
import { IDENTIFIER } from '../constants/identifier';
import { IUser, IUserDocument } from '../models/userModel';
import { IUserRepository } from '../repository/userRepository';
import { DuplicateError, NotFoundError } from '../utils/errorUtil';
import { ERROR } from '../constants/errorMessage';

export interface IUserService {
  createUser(userData: IUser): Promise<IUserDocument>;
  getUsers(query: ISearchQuery): Promise<IPagination<IUserDocument>>;
  updateUserById(query: IObject, updateData: IObject): Promise<IDocumentUpdate>;
  getUserHobbies(userId: ObjectId): Promise<IUserDocument>;
  getUserById(userId: ObjectId, project?: IObject): Promise<IUserDocument>
}

@injectable()
export class UserService implements IUserService {
  private userRepository;

  constructor(
    @inject(IDENTIFIER.UserRepository) userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async getUserById(userId: ObjectId, project?: IObject): Promise<IUserDocument> {
    return this.userRepository.getUserById(userId, project);
  }

  public async findUserByEmail(searchQuery: object, project: object): Promise<IUserDocument> {
    return this.userRepository.findUserByEmail(searchQuery, project);
  }

  public async createUser(userData: IUser): Promise<IUserDocument> {
    // const existingUser = await this.findUserByEmail({ email: userData.email }, { email: 1 });
    // if (existingUser) {
    //   throw new DuplicateError(ERROR.USER_ALREADY_EXISTS);
    // }
    return await this.userRepository.saveUser(userData);
  }

  public async getUsers(query: ISearchQuery): Promise<IPagination<IUserDocument>> {
    return this.userRepository.getUsers(query);
  }

  public async updateUserById(query: IObject, updateData: IObject): Promise<IDocumentUpdate> {
    // let existingUser = await this.userRepository.getUserById(query._id);
    // if (!existingUser) {
    //   throw new NotFoundError(ERROR.USER_DOES_NOT_EXISTS)
    // }
    return this.userRepository.updateUser(query, updateData);
  }

  public async getUserHobbies(userId: ObjectId): Promise<IUserDocument> {
    let user = await this.userRepository.getUserById(userId);
    // if (!user) {
    //   throw new NotFoundError(ERROR.USER_DOES_NOT_EXISTS)
    // }
    return this.userRepository.getUserHobbies(userId);
  }

}