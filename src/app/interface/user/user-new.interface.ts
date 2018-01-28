export interface IUserNew {
  institutionName?: string;
  fname?: string;
  lname?: string;
  email: string;
  username: string;
  gender?: string;
  address: string;
  postalCode: string;
  city: string;
  nickName?: string;
  lat?: number;
  long?: number;
  roleId: number;
  password: string;
  confirmedPassword: string;
}
