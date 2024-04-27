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

export default attendanceUser;
