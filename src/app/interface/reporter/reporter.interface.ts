import { IUser } from '../user/user.interface';
import { IHost } from '../host/host.interface';
import { ITeam } from '../team/team.interface';
import { IConversation } from '../conversation/conversation.interface';

export interface IReporter {
    _id?: number;
    isVolunteer?: boolean;
    fname?: string;
    lname?: string;
    gender?: string;
    streetName?: string;
    postalCode?: string;
    city?: string;
    email?: string;
    phoneNumber?: string;
    username?: string;
    status1?: string;
    status2?: string;
    dateRegistrationReporter?: string;
    dateCreationTeam?: string;
    _reporter?: IUser;
    _host?: IHost;
    _team?: ITeam;
    createdAt?: Date;
    updatedAt?: Date;
}
