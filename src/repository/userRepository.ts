import { injectable } from 'inversify';
import { IUser, IUserDocument, userModel } from '../models/userModel';
import { ObjectId } from 'bson';
import { IDocumentUpdate, IObject, IPagination, ISearchQuery } from '../common/commonInterface';

export interface IUserRepository {
  getUserById(userId: ObjectId, project?: {}): Promise<IUser>;
  findUserByEmail(searchQuery, project): Promise<IUserDocument>;
  saveUser(userData: IUser): Promise<IUserDocument>;
  updateUser(updateQuery: object, updateData: object): Promise<IDocumentUpdate>;
  getUsers(searchQuery: ISearchQuery): Promise<IPagination<IUserDocument>>;
  updateUser(updateQuery: object, updateData: object): Promise<IDocumentUpdate> 
}

@injectable()
export class UserRepository implements IUserRepository {

  public async getUserById(userId: ObjectId, project?: {}): Promise<IUserDocument> {
    return userModel
      .findById({ _id: userId }, project)
      .lean();
  }
  
  public async findUserByEmail(searchQuery, project?: {}): Promise<IUserDocument> {
    return userModel
      .findOne(searchQuery, project)
      .lean();
  }

  public async saveUser(userData: IUser): Promise<IUserDocument> {
    return userModel.create(userData);
  }

  public async getUsers(searchQuery: ISearchQuery): Promise<IPagination<IUserDocument>> {
    if (!searchQuery.baseQuery) throw new Error('BASE Query does not exist');
    const data = await userModel
    .find(searchQuery.baseQuery)
    .select(searchQuery.filterQuery?.select)
    .skip(searchQuery.filterQuery?.skip)
    .limit(searchQuery.filterQuery?.limit)
    .lean(searchQuery.filterQuery?.lean || false);

    const totalRecords = await userModel.count(searchQuery.baseQuery);

    return { 
      data, 
      totalRecords,
      recordsPerPage: searchQuery.filterQuery?.limit
    };
  }

  public async updateUser(updateQuery: IObject, updateData: IObject): Promise<IDocumentUpdate> {
    return userModel.updateOne(updateQuery, { $set: updateData });
  }

  public async getUserHobbies(userId: ObjectId): Promise<IUserDocument> {
    return await userModel.findOne({ _id: userId })
    .populate({
      path: 'userHobbies',
      match: { is_deleted: false },
      select: 'name from passion_level'
    });
  }

}