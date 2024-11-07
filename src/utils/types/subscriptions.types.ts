import IUser from "./user.types";

export interface ISubscriptions extends IUser {
  UserID: number;
  SubscriptionID: number;
  SubscriptionAmount: number;
  SubscriptionStatus?: string;
  SubscriptionMethod?: string;
  SubscriptionUploadedImage: string | undefined;
  SubscriptionType: string;
  SubscriptionEntryDate: string;
  SubscriptionBy?: string;
}

export interface ISubscriptionHistoryDate {
  subscriptionDate: string;
}
