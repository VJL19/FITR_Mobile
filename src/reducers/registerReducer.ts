import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRegisterState, RegisterPayload } from "../utils/types/user.types";
import registerUser from "../actions/registerAction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";

const initialState: IRegisterState = {
  status: 0,
  details: {},
  isLoading: false,
  form: {
    LastName: "",
    FirstName: "",
    MiddleName: "",
    Age: "",
    ContactNumber: "",
    Email: "",
    Gender: "",
    Password: "",
    ConfirmPassword: "",
    Height: "",
    Weight: "",
    ProfilePic: "",
    Username: "",
  },
};

const config = loadConfig();
export const registerslice = createApi({
  reducerPath: "user/register",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: () => {},
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IRegisterState, RegisterPayload>({
      query: (arg) => ({
        url: "/user/register_account",
        method: "POST",
        body: arg,
      }),
    }),
  }),
});

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      const copyValues = state.form;
      const { payload } = action;
      state.form = {
        ...copyValues,
      };
    },
  },
  extraReducers: (builder) => {
    //for register api call.
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.details = action?.payload?.details;
      state.status = 200;
      state.isLoading = false;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.details = { message: "pending" };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.details = action?.payload?.message;
      state.status = action?.payload?.status;
      state.isLoading = false;
    });
    //for log out api call.
  },
});
export const { useRegisterUserMutation } = registerslice;
export default registerSlice.reducer;
