import { injectable } from 'inversify';
import { hobbyModel, IHobby, IHobbyDocument } from '../models/hobbiesModel';
import { IObject, IPagination, ISearchQuery, IDocumentUpdate } from '../common/commonInterface';
import { IUpdateHobby } from '../services/hobbyService';
import { ObjectId } from 'bson';

export interface IHobbyRepository {
  createHobby(hobbyData: IHobby): Promise<IHobbyDocument>;
  updateHobby(query: IObject, updateData: IUpdateHobby): Promise<IDocumentUpdate>;
  getHobbyById(hobbyId: ObjectId, project?: {}): Promise<IHobbyDocument> 
}

@injectable()
export class HobbyRepository implements IHobbyRepository {

  public async createHobby(hobbyData: IHobby): Promise<IHobbyDocument> {
    return hobbyModel.create(hobbyData);
  }

  public async getHobbyById(hobbyId: ObjectId, project?: {}): Promise<IHobbyDocument> {
    return hobbyModel
      .findById({ _id: hobbyId }, project)
      .lean();
  }

  public async getHobbies(searchQuery: ISearchQuery): Promise<IPagination<IHobbyDocument>> {
    if (!searchQuery.baseQuery) throw new Error('BASE Query does not exist');
    const data = await hobbyModel
    .find(searchQuery.baseQuery)
    .select(searchQuery.filterQuery?.select)
    .skip(searchQuery.filterQuery?.skip)
    .limit(searchQuery.filterQuery?.limit)
    .lean(searchQuery.filterQuery?.lean || false);

    let totalRecords;
    if (searchQuery.totalCountQuery) {
      totalRecords = await hobbyModel.count(searchQuery);
    }

    return { 
      data, 
      totalRecords,
      recordsPerPage:  searchQuery.filterQuery?.limit
    };
  }

  public async updateHobby(query: IObject, updateData: IUpdateHobby): Promise<IDocumentUpdate> {
    return hobbyModel.updateOne(query, { $set: updateData });
  }
}

