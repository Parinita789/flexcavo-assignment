import { ObjectId } from 'bson';
import { Model, model, Schema } from 'mongoose';
import { PASSION_LEVEL } from '../constants/passionLevel';

export interface IHobbyDocument extends IHobby {
  _id: ObjectId,
  created_at: Date,
  updated_at: Date
}

export interface IHobby {
  name:  string,
  passion_level: PASSION_LEVEL,
  user: ObjectId,
  from: number,
  is_deleted: boolean
}

export const hobbySchema = new Schema(
  {
    name: { type: String, required: true },
    passion_level: { type: String, required: true, enum: PASSION_LEVEL },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Principle of Least Cardinality - Store relationships in a way that minimizes the size of individual documents.
    from: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const hobbyModel: Model<IHobbyDocument> = model<IHobbyDocument>('hobbies', hobbySchema);