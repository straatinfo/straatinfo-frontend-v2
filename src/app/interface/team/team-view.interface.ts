import { ITeamLeader } from "./teamLeader.interface";
import { ITeamMember } from "./teamMember.interface";

export interface ITeamView {
    _id?: string;
    teamName?: string;
    teamEmail?: string;
    isVolunteer?: boolean;
    isApproved?: boolean;
    logoUrl?: string;
    logoSecuredUrl?: string;
    description?: string;
    _host?: string;
    _hostName?: string;
    _hostEmail?: string;
    teamLeaders?: ITeamLeader[];
    teamMembers?: ITeamMember[];
}
