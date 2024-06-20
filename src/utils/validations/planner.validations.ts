import Joi from "joi";
import IProgram from "utils/types/program_planner.types";

const programSchema = Joi.object<IProgram>({
  UserID: Joi.number().required(),
  ProgramTitle: Joi.string().required(),
  ProgramDescription: Joi.string().required(),
});

export const editProgramSchema = Joi.object<IProgram>({
  UserID: Joi.number().required(),
  ProgramID: Joi.number().required(),
  ProgramTitle: Joi.string().required(),
  ProgramDescription: Joi.string().required(),
});

export default programSchema;
