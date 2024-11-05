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
    .min(8)
    .max(30)
    .pattern(/(?=(?:.*[a-z]){1,16}).+/, "lowercase")
    .pattern(/(?=(?:.*[A-Z]){1,16}).+/, "uppercase")
    .pattern(/(?=(?:.*[0-9]){1,16}).+/, "number")
    .pattern(/(?=(?:.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1,16}).+/, "special")
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
          case "string.empty":
          case "any.required":
          default:
            err.message = "Password is required.";
            break;
          case "string.min":
            err.message = "Password should not be minimum 8 characters.";
            break;
          case "string.max":
            err.message = "Password max at 30 characters.";
            break;
          case "string.pattern.name":
            switch (err.local.name) {
              case "lowercase":
                err.message = "must contain at least 1 lower-case letter";
                break;
              case "uppercase":
                err.message = "must contain at least 1 upper-case letter";
                break;
              case "number":
                err.message = "must contain at least 1 number";
                break;
              case "special":
                err.message = "must contain at least 1 special character";
                break;
            }
            break;
        }
      });
      return errors;
    }),
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
    .min(8)
    .max(30)
    .pattern(/(?=(?:.*[a-z]){1,16}).+/, "lowercase")
    .pattern(/(?=(?:.*[A-Z]){1,16}).+/, "uppercase")
    .pattern(/(?=(?:.*[0-9]){1,16}).+/, "number")
    .pattern(/(?=(?:.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1,16}).+/, "special")
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
          case "string.empty":
          case "any.required":
          default:
            err.message = "Password is required.";
            break;
          case "string.min":
            err.message = "Password should not be minimum 8 characters.";
            break;
          case "string.max":
            err.message = "Password max at 30 characters.";
            break;
          case "string.pattern.name":
            switch (err.local.name) {
              case "lowercase":
                err.message =
                  "Password must contain at least 1 lower-case letter";
                break;
              case "uppercase":
                err.message =
                  "Password must contain at least 1 upper-case letter";
                break;
              case "number":
                err.message = "Password must contain at least 1 number";
                break;
              case "special":
                err.message =
                  "Password must contain at least 1 special character";
                break;
            }
            break;
        }
      });
      return errors;
    }),
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
    .min(8)
    .max(30)
    .pattern(/(?=(?:.*[a-z]){1,16}).+/, "lowercase")
    .pattern(/(?=(?:.*[A-Z]){1,16}).+/, "uppercase")
    .pattern(/(?=(?:.*[0-9]){1,16}).+/, "number")
    .pattern(/(?=(?:.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]){1,16}).+/, "special")
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.base":
          case "string.empty":
          case "any.required":
          default:
            err.message = "Password is required.";
            break;
          case "string.min":
            err.message = "Password should not be minimum 8 characters.";
            break;
          case "string.max":
            err.message = "Password max at 30 characters.";
            break;
          case "string.pattern.name":
            switch (err.local.name) {
              case "lowercase":
                err.message =
                  "Password must contain at least 1 lower-case letter";
                break;
              case "uppercase":
                err.message =
                  "Password must contain at least 1 upper-case letter";
                break;
              case "number":
                err.message = "Password must contain at least 1 number";
                break;
              case "special":
                err.message =
                  "Password must contain at least 1 special character";
                break;
            }
            break;
        }
      });
      return errors;
    }),
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
