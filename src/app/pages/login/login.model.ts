export interface ILoginModel {
  UserName: string;
  Password: string;
  LoginType: string;
};
export class LoginModel implements ILoginModel {
  UserName: string;
  Password: string;
  LoginType: string;
}
