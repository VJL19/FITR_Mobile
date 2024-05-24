interface IForm {
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

export interface IPersonalDetails {
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Age: string;
}

export interface IContactDetails {
  ContactNumber: string;
  Email: string;
  Height: string;
  Weight: string;
}

export interface IAccountSetup {
  Username?: string;
  Password?: string;
  ConfirmPassword?: string;
  Gender?: string;
  ProfilePic?: string;
}

export default IForm;
