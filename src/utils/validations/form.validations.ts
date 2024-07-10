import Joi from "joi";
import IForm, { IChangePassword, IEmail, IOTP } from "../types/form.types";

const personalDetailsSchema = Joi.object<IForm>({
  LastName: Joi.string().min(5).max(150).required().label("LastName"),
  FirstName: Joi.string().min(5).max(150).required().label("FirstName"),
  MiddleName: Joi.string().min(5).max(150).required().label("MiddleName"),
  Age: Joi.string().required().label("Age"),
  Birthday: Joi.string().required().label("Birthday"),
});

const accountDetailsSchema = Joi.object<IForm>({
  Username: Joi.string().alphanum().min(5).max(30).required().label("Username"),
  Password: Joi.string()
    .alphanum()
    .min(5)
    .max(30)
    .message("Your Password must be atleast 5 characters")
    .required()
    .label("Password"),
  ConfirmPassword: Joi.any()
    .valid(Joi.ref("Password"))
    .required()
    .messages({
      "any.only": "Your Password do not match!",
      "any.required": "ConfirmPassword is not allowed to be empty",
    })
    .label("ConfirmPassword"),
  ProfilePic: Joi.string().optional().label("ProfilePic"),
  Gender: Joi.string().required().label("Gender"),
  SubscriptionType: Joi.string().required().label("SubscriptionType"),
});

const contactDetailsSchema = Joi.object<IForm>({
  ContactNumber: Joi.string().max(11).required().label("ContactNumber"),
  Email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "ph"] } })
    .message("Only .com and .ph email are allowed.")
    .required()
    .label("Email"),
  Height: Joi.string().required().label("Height"),
  Weight: Joi.string().required().label("Weight"),
  Address: Joi.string().required().label("Address"),
});

const formSchema = Joi.object<IForm>({
  LastName: Joi.string().min(5).max(150).required().label("LastName"),
  FirstName: Joi.string().min(5).max(150).required().label("FirstName"),
  MiddleName: Joi.string().min(5).max(150).required().label("MiddleName"),
  Age: Joi.string().required().label("Age"),
  Birthday: Joi.string().required().label("Birthday"),
  Address: Joi.string().required().label("Address"),
  ContactNumber: Joi.string().max(11).required().label("ContactNumber"),
  Email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "ph"] } })
    .message("Only .com and .ph email are allowed.")
    .required()
    .label("Email"),
  Height: Joi.string().required().label("Height"),
  Weight: Joi.string().required().label("Weight"),
  Username: Joi.string().alphanum().min(5).max(30).required().label("Username"),
  Password: Joi.string()
    .alphanum()
    .min(5)
    .max(30)
    .message("Your Password must be atleast 5 characters")
    .required()
    .label("Password"),
  ConfirmPassword: Joi.any()
    .valid(Joi.ref("Password"))
    .required()
    .messages({
      "any.only": "Your Password do not match!",
      "any.required": "ConfirmPassword is not allowed to be empty",
    })
    .label("ConfirmPassword"),
  ProfilePic: Joi.string().optional().label("ProfilePic"),
  Gender: Joi.string().required().label("Gender"),
  SubscriptionType: Joi.string().required().label("SubscriptionType"),
});

const otpSchema = Joi.object<IOTP>({
  OTPCode: Joi.number()
    .min(6)
    .message("Entered OTP cannot be less than 6 digit")
    .required()
    .label("OTPCode"),
});

const emailSchema = Joi.object<IEmail>({
  Email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "ph"] } })
    .message("Only .com and .ph email are allowed")
    .required()
    .label("Email"),
});
const changePasswordSchema = Joi.object<IChangePassword>({
  Password: Joi.string()
    .alphanum()
    .min(5)
    .max(30)
    .message("Your Password must be atleast 5 characters")
    .required()
    .label("Password"),
  ConfirmPassword: Joi.any()
    .valid(Joi.ref("Password"))
    .required()
    .messages({
      "any.only": "Your Password do not match!",
      "any.required": "ConfirmPassword is not allowed to be empty",
    })
    .label("ConfirmPassword"),
});
export {
  formSchema,
  personalDetailsSchema,
  contactDetailsSchema,
  accountDetailsSchema,
  otpSchema,
  emailSchema,
  changePasswordSchema,
};
