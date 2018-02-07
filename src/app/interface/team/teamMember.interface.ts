import { IUser } from '../user/user.interface';
import { ITeam } from './team.interface';

export interface ITeamMember {
    _id?: string;
    _user?: IUser;
    _team?: ITeam;
}
