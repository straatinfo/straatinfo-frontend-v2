import { IUser } from '../user/user.interface';
import { IMessage } from './message.interface';
import { IParticipant } from './participant.interface';

export interface IConversation {
  _id?: string;
  title?: string;
  type?: string;
  _author?: IUser;
  participants?: IParticipant;
  message?: IMessage;
}
