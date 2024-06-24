export interface ISubscriptions {
  UserID: number;
  SubscriptionID: number;
  SubscriptionAmount: number;
  SubscriptionStatus?: string;
  SubscriptionUploadedImage: string | undefined;
  SubscriptionType: string;
  SubscriptionEntryDate: string;
}
