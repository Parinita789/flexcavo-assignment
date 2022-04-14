import { ObjectId } from 'bson';
import { Model, model, Schema } from 'mongoose';
import { IHobby } from './hobbiesModel';
export interface IUserDocument extends IUser {
  _id: ObjectId,
  created_at: Date,
  updated_at: Date
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string,
  is_deleted?: boolean,
  userHobbies?: IHobby[]
}

export const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    is_deleted: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }},
);

userSchema.virtual('userHobbies', {
  ref: 'hobbies',
  localField: '_id',
  foreignField: 'user'
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

export const userModel: Model<IUserDocument> = model<IUserDocument>('users', userSchema);
