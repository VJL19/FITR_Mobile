import { createSlice } from "@reduxjs/toolkit";
import {
  attendanceUser,
  checkUserScanQr,
  getSecretCode,
} from "../actions/attendanceAction";
import IAttendance from "../utils/types/attendance.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import * as SecureStore from "expo-secure-store";

interface IAttendanceState {
  error: string;
  status: number;
  message: string;
  secretCode: string;
  IsScanQR: boolean;
  isLoading: boolean;
  user: IAttendance;
  result: IAttendance[];
}

const initialState: IAttendanceState = {
  status: 0,
  error: "",
  message: "",
  secretCode: "",
  IsScanQR: false,
  isLoading: false,
  user: {
    UserID: 0,
    ProfilePic: "",
    LastName: "",
    FirstName: "",
    SubscriptionType: "",
    SubscriptionExpectedEnd: "",
    DateScanned: "",
    IsPaid: false,
    IsScanQR: false,
  },
  result: [],
};

const config = loadConfig();

export const attendanceslice = createApi({
  reducerPath: "user/attendance",
  tagTypes: ["attendance"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: async (headers: Headers) => {
      // const token = (getState() as RootState).authReducer.accessToken;
      const token = await SecureStore.getItemAsync("accessToken");
      // console.log("state", getState());
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserRecords: builder.query<IAttendanceState, number | undefined>({
      query: (UserID) => `/user/specific_record/:${UserID}`,
      providesTags: ["attendance"],
    }),
    checkUserScanQr: builder.query<IAttendanceState, number | undefined>({
      query: (UserID) => `/user/check_IsScanQR/:${UserID}`,
      providesTags: ["attendance"],
    }),
  }),
});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Attendance user through scanning the qr code
    builder.addCase(attendanceUser.fulfilled, (state, action) => {
      state.error = action.payload?.error;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(attendanceUser.pending, (state, action) => {
      state.status = 202;
      state.message = { details: "Loading attendance..." };
      state.isLoading = true;
    });
    builder.addCase(attendanceUser.rejected, (state, action) => {
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.message = action.payload;
      state.isLoading = false;
    });
    //getting the secret code.
    builder.addCase(getSecretCode.fulfilled, (state, action) => {
      state.error = action.payload?.error;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
      state.secretCode = action.payload.secretCode;
      state.isLoading = false;
    });
    builder.addCase(getSecretCode.pending, (state, action) => {
      state.status = 202;
      state.message = { details: "Loading in getting secret code for qr...." };
      state.isLoading = true;
    });
    builder.addCase(getSecretCode.rejected, (state, action) => {
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.message = action.payload;
      state.isLoading = false;
    });
    //checking for user if IsScan.
    builder.addCase(checkUserScanQr.fulfilled, (state, action) => {
      state.error = action.payload?.error;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
      state.IsScanQR = action.payload?.IsScanQR;
      state.user = action.payload?.user;
      state.isLoading = false;
    });
    builder.addCase(checkUserScanQr.pending, (state, action) => {
      state.status = 202;
      state.message = { details: "Loading in checking the user scan qr...." };
      state.isLoading = true;
    });
    builder.addCase(checkUserScanQr.rejected, (state, action) => {
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.message = action.payload;
      state.IsScanQR = action.payload?.IsScanQR;
      state.isLoading = false;
    });
  },
});

export const { useGetUserRecordsQuery, useCheckUserScanQrQuery } =
  attendanceslice;
export default attendanceSlice.reducer;
