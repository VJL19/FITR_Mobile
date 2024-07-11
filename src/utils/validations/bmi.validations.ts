import Joi from "joi";
import { IBMIField } from "../../screens/drawers/CalculateBMI";

const bmiSchema = Joi.object<IBMIField>({
  Age: Joi.number().required(),
  Gender: Joi.string().required(),
  Height: Joi.number().required(),
  Weight: Joi.number().required(),
});
export default bmiSchema;
