import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import { RootState } from "store/store";
import IProgram from "utils/types/program_planner.types";

interface IProgramState {
  message: string;
  status: number;
  error: string;
  result: IProgram[];
  programData: IProgram;
}

const initialProgramState: IProgramState = {
  programData: {
    ProgramID: 0,
    ProgramTitle: "",
    ProgramDescription: "",
    ProgramEntryDate: "",
  },
};

const config = loadConfig();

export const programApi = createApi({
  reducerPath: "/user/program",
  tagTypes: ["program"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: async (headers: Headers, { getState }) => {
      const token = (getState() as RootState).authReducer.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserSpecificPrograms: builder.query<IProgramState, number | undefined>({
      query: (UserID) => `/user/program/display_planner/:${UserID}`,
      providesTags: ["program"],
    }),
    createUserProgram: builder.mutation<IProgramState, IProgram>({
      query: (arg) => ({
        url: "/user/program/create_planner",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["program"],
    }),
    editUserProgram: builder.mutation<IProgramState, IProgram>({
      query: (arg) => ({
        url: "/user/program/edit_planner",
        body: arg,
        method: "POST",
      }),
      invalidatesTags: ["program"],
    }),
    deleteUserProgram: builder.mutation<IProgramState, number | undefined>({
      query: (ProgramID) => ({
        url: `/user/program/delete_planner/:${ProgramID}`,
        params: { ProgramID },
        method: "DELETE",
      }),
      invalidatesTags: ["program"],
    }),
  }),
});

const programSlice = createSlice({
  name: "program",
  initialState: initialProgramState,
  reducers: {
    setProgramData: (state, action: PayloadAction<IProgram>) => {
      state.programData = action.payload;
    },
  },
});
export const { setProgramData } = programSlice.actions;
export const {
  useGetUserSpecificProgramsQuery,
  useCreateUserProgramMutation,
  useEditUserProgramMutation,
  useDeleteUserProgramMutation,
} = programApi;
export default programSlice.reducer;
