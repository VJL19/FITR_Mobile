import IUser from "./user.types";

interface IAttendance {
  UserID: number;
  AttendanceID: number;
  ProfilePic: string;
  LastName: string;
  FirstName: string;
  SubscriptionType: string;
  SubscriptionExpectedEnd: string;
  TimeIn: string;
  TimeOut: string;
  DateTapped: string;
  IsPaid: boolean;
  Username?: string;
  RFIDNumber?: string;
}

export interface IAttendanceDate {
  attendanceDate: string;
}

export default IAttendance;
