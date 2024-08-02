import IUser from "./user.types";

interface IProgram extends IUser {
  ProgramID: number;
  ProgramTitle: string;
  ProgramDescription: string;
  ProgramEntryDate: string;
}
export interface IProgramSuggested {
  SuggestedProgramID: number;
  SuggestedProgramTitle: string;
  SuggestedProgramDescription: string;
  SuggestedProgramEntryDate: string;
}

export default IProgram;
