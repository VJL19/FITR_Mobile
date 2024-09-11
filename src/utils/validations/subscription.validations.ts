import Joi from "joi";
import { ISubscriptionHistoryDate } from "utils/types/subscriptions.types";

const subscriptionHistorySchema = Joi.object<ISubscriptionHistoryDate>({
  subscriptionDate: Joi.string().required(),
});

export default subscriptionHistorySchema;
