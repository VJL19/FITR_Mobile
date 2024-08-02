import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import { RootState } from "store/store";
import IProgram, { IProgramSuggested } from "utils/types/program_planner.types";

interface IProgramState {
  message: string;
  status: number;
  error: string;
  result: IProgram[];
  programData: IProgram;
  suggestedProgramData: IProgramSuggested;
}

interface IProgramApiState {
  error: string;
  message: string;
  status: number;
  result: IProgramSuggested[];
}
const initialProgramState: IProgramState = {
  programData: {
    ProgramID: 0,
    ProgramTitle: "",
    ProgramDescription: "",
    ProgramEntryDate: "",
    UserID: 0,
    LastName: "",
    FirstName: "",
    MiddleName: "",
    Age: 0,
    ContactNumber: "",
    Email: "",
    Height: 0,
    Weight: 0,
    Username: "",
    Password: "",
    ConfirmPassword: "",
    ProfilePic: "",
    Gender: "",
    SubscriptionType: "",
    Address: "",
    Birthday: "",
    AttendanceID: 0,
    SubscriptionExpectedEnd: "",
    TimeIn: "",
    TimeOut: "",
    DateTapped: "",
    IsPaid: false,
  },
  suggestedProgramData: {
    SuggestedProgramID: 0,
    SuggestedProgramTitle: "",
    SuggestedProgramDescription: "",
    SuggestedProgramEntryDate: "",
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
    getTodayPrograms: builder.query<IProgramState, number | undefined>({
      query: (UserID) => `/user/program/todays_program/:${UserID}`,
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
    getAdminSuggestedProgram: builder.query<IProgramApiState, void>({
      query: () => "/admin/program/program_suggested",
      providesTags: ["program"],
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
    setSuggestedProgramData: (
      state,
      action: PayloadAction<IProgramSuggested>
    ) => {
      state.suggestedProgramData = action.payload;
    },
  },
});
export const { setProgramData, setSuggestedProgramData } = programSlice.actions;
export const {
  useGetUserSpecificProgramsQuery,
  useCreateUserProgramMutation,
  useEditUserProgramMutation,
  useGetTodayProgramsQuery,
  useDeleteUserProgramMutation,
  useGetAdminSuggestedProgramQuery,
} = programApi;
export default programSlice.reducer;
