import { createAsyncThunk } from "@reduxjs/toolkit";
import global_axios from "../global/axios";
import { AxiosError } from "axios";
import { KnownError } from "./registerAction";
import IAttendance from "../utils/types/attendance.types";

const attendanceUser = createAsyncThunk(
  "/user/attendance",
  async (arg: IAttendance, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/attendance", arg);

      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      rejectWithValue(error.response?.data);
    }
  }
);

const getSecretCode = createAsyncThunk(
  "/user/secret_code",
  async (_, { rejectWithValue }) => {
    try {
      const res = await global_axios.get("/admin/generate_code");

      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;

      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const checkUserScanQr = createAsyncThunk(
  "/user/IsScanQR",
  async (arg: IAttendance, { rejectWithValue }) => {
    const { UserID } = arg;
    try {
      const res = await global_axios.post("/user/check_IsScanQR", { UserID });

      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;

      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export { attendanceUser, getSecretCode, checkUserScanQr };
