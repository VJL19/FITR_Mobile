import "text-encoding-polyfill";
import {
  formSchema,
  personalDetailsSchema,
  contactDetailsSchema,
  accountDetailsSchema,
  otpSchema,
  emailSchema,
  changePasswordSchema,
} from "./form.validations";
import { loginSchema } from "./user.validations";
import postSchema from "./post.validations";
import commentSchema from "./comments.validations";
import myAccountSchema from "./myaccount.validations";
import attendanceDateSchema from "./attendance.validations";
import subscriptionHistorySchema from "./subscription.validations";
export {
  formSchema,
  personalDetailsSchema,
  loginSchema,
  postSchema,
  commentSchema,
  myAccountSchema,
  contactDetailsSchema,
  accountDetailsSchema,
  otpSchema,
  emailSchema,
  changePasswordSchema,
  attendanceDateSchema,
  subscriptionHistorySchema,
};
