import Joi from "joi";
import { IBMIField } from "../../screens/drawers/CalculateBMI";

const bmiSchema = Joi.object<IBMIField>({
  Height: Joi.number().required(),
  Weight: Joi.number().required(),
});
export default bmiSchema;
