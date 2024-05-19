import Joi from "joi";
import { ILoginForm } from "../types/user.types";

const loginSchema = Joi.object<ILoginForm>({
  Username: Joi.string().required(),
  Password: Joi.string().required(),
});

export { loginSchema };
