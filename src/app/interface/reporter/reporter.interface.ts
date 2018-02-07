import { IUser } from '../user/user.interface';
import { IHost } from '../host/host.interface';
import { ITeam } from '../team/team.interface';
import { IConversation } from '../conversation/conversation.interface';

export interface IReporter {
    _id?: number;
    firstName?: string;
    lastName?: string;
    volunteer?: string;
    status1?: string;
    status2?: string;
    _reporter?: IUser;
    _host?: IHost;
    _team?: ITeam;
    _chat?: IConversation;
    createdAt?: Date;
    updatedAt?: Date;
}
