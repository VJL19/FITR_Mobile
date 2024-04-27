import IUser from "./user.types";

interface IAttendance {
  UserID: number;
  ProfilePic: string;
  LastName: string;
  FirstName: string;
  SubscriptionType: string;
  DateScanned: string;
  IsPaid: boolean;
  IsScanQR: boolean;
}

export default IAttendance;
