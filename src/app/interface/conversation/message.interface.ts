import { IUser } from '../user/user.interface';
import { IConversation } from './conversation.interface';

export interface IMessage {
  _id?: string;
  body?: string;
  _author?: IUser;
  _conversation?: IConversation;
}
