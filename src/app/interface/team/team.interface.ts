import { ITeamLeader } from './teamLeader.interface';
import { ITeamMember } from './teamMember.interface';
import { IHost } from '../host/host.interface';

export interface ITeam {
    _id?: string;
    teamName?: string;
    teamEmail?: string;
    isVolunteer?: boolean;
    isApproved?: boolean;
    logoUrl?: string;
    logoSecuredUrl?: string;
    description?: string;
    _host?: string;
    createdAt?: Date;
    updatedAt?: Date;
    teamLeaders?: ITeamLeader[];
    teamMembers?: ITeamMember[];
}
