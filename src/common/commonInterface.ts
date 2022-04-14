import { ObjectId } from "mongodb";

export interface IObject {
  [key: string]: any;
}

export interface IPagination<T> {
  data: T[];
  recordsPerPage: number,
  totalRecords: number;
}
  
export interface IPaginationFilter {
  select?: IObject,
  sort?: number,
  skip?: number,
  limit?: number,
  lean?: boolean
}

export interface ISearchQuery {
  baseQuery: IObject,
  filterQuery: IPaginationFilter,
  totalCountQuery?: IObject
}

export interface IDocumentUpdate {
  acknowledged: boolean,
  modifiedCount: number,
  upsertedId: ObjectId | null,
  upsertedCount: number,
  matchedCount: number
}