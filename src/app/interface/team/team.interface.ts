import { IUser } from '../user/user.interface';
import { ITeamLeader } from './teamLeader.interface';
import { ITeamMember } from './teamMember.interface';

export interface ITeam {
    _id?: string;
    teamName?: string;
    teamEmail?: string;
    isVolunteer?: boolean;
    logoUrl?: string;
    logoSecuredUrl?: string;
    description?: string;
    _host?: IUser;
    teamLeaders?: ITeamLeader;
    teamMembers?: ITeamMember;
}
