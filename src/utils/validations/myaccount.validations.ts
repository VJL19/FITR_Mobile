import Joi from "joi";
import { IChangeAccount } from "../types/user.types";

const myAccountSchema = Joi.object<IChangeAccount>({
  UserID: Joi.number().required(),
  Username: Joi.string().alphanum().min(5).max(30).required().label("Username"),
  Email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "ph"] } })
    .message("Only .com and .ph email are allowed.")
    .required()
    .label("Email"),
  ContactNumber: Joi.string().max(11).required().label("ContactNumber"),
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

export default myAccountSchema;
