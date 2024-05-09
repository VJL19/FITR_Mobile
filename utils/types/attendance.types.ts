import IUser from "./user.types";

interface IAttendance {
  UserID: number;
  ProfilePic: string;
  LastName: string;
  FirstName: string;
  SubscriptionType: string;
  SubscriptionExpectedEnd: string;
  DateScanned: string;
  IsPaid: boolean;
  IsScanQR: boolean;
  Username?: string;
}

export default IAttendance;
