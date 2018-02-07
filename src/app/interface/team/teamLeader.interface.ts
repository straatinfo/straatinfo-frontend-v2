import { IUser } from '../user/user.interface';
import { ITeam } from './team.interface';

export interface ITeamLeader {
  _id?: string;
  _user?: IUser;
  _team?: ITeam;
}
