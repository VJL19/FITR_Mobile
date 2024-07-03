import IUser from "./user.types";

export interface INotifications extends IUser {
  UserID: number;
  PostAuthor: string;
  NotificationID: number;
  NotificationText: string;
  isMarkRead: string;
  NotifBy: string;
  NotificationType: string;
  NotificationDate: string;
  NotificationCount: string;
}
