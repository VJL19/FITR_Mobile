import IAttendance from "./attendance.types";
import IForm from "./form.types";

interface IUser extends IAttendance {
  UserID: number;
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Age: number;
  ContactNumber: string;
  Email: string;
  Height: number;
  Weight: number;
  Username: string;
  Password: string;
  ConfirmPassword: string;
  ProfilePic: string;
  Gender: string;
  SubscriptionType: string;
}

export interface ILoginForm {
  Username: string;
  Password: string;
}

export interface IRegisterState {
  status: number | undefined;
  details: object | undefined | unknown;
  isLoading: boolean;
  form: IForm;
}

export interface RegisterPayload {
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Age: string;
  ContactNumber: string;
  Email: string;
  Height: string;
  Weight: string;
  Username: string;
  Password: string;
  ConfirmPassword: string;
  ProfilePic: string | undefined;
  Gender: string;
}

export interface IAuthState {
  status: number;
  user: IUser;
  accessToken: string | undefined | null;
  message: string | unknown | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginPayload {
  Username: string;
  Password: string;
}

export interface IChangeAccount {
  Username: string;
  Email: string;
  ContactNumber: string;
  Password: string;
  ConfirmPassword: string;
}

export default IUser;
