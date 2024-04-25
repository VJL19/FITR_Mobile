interface IUser {
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
}

export interface IRegisterState {
  status: number | undefined;
  details: object | undefined | unknown;
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
  ProfilePic: string;
  Gender: string;
}
export default IUser;
