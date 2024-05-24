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

export default myAccountSchema;
