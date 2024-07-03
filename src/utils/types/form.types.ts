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
  Birthday: string;
  Address: string;
  SubscriptionType: string;
}

export interface IPersonalDetails {
  LastName: string;
  FirstName: string;
  MiddleName: string;
  Age: string;
  Birthday: string;
}

export interface IContactDetails {
  ContactNumber: string;
  Email: string;
  Height: string;
  Weight: string;
  Address: string;
}

export interface IOTP {
  OTPCode: number;
}

export interface IAccountSetup {
  Username: string;
  Password: string;
  ConfirmPassword: string;
  Gender: string;
  ProfilePic: string;
  SubscriptionType: string;
}

export default IForm;
