import Joi from "joi";
import IForm from "../types/form.types";

const personalDetailsSchema = Joi.object<IForm>({
  LastName: Joi.string().min(5).max(150).required().label("LastName"),
  FirstName: Joi.string().min(5).max(150).required().label("FirstName"),
  MiddleName: Joi.string().min(5).max(150).required().label("MiddleName"),
  Age: Joi.string().required().label("Age"),
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
});

const formSchema = Joi.object<IForm>({
  LastName: Joi.string().min(5).max(150).required().label("LastName"),
  FirstName: Joi.string().min(5).max(150).required().label("FirstName"),
  MiddleName: Joi.string().min(5).max(150).required().label("MiddleName"),
  Age: Joi.string().required().label("Age"),
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
});
export {
  formSchema,
  personalDetailsSchema,
  contactDetailsSchema,
  accountDetailsSchema,
};
