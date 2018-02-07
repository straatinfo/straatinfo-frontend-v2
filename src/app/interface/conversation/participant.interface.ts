import { IUser } from '../user/user.interface';
import { IConversation } from '../conversation/conversation.interface';

export interface IParticipant {
  _id?: string;
  _conversation?: IConversation;
  _user?: IUser;
}
