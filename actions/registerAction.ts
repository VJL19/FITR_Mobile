import { createAsyncThunk } from "@reduxjs/toolkit";
import IUser, { RegisterPayload } from "../utils/types/user.types";
import global_axios from "../global/axios";
import { AxiosError } from "axios";

export type KnownError = {
  message: string;
  description: string;
  code: number | undefined;
};
const registerUser = createAsyncThunk(
  "user/register",
  async (registerPayload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await global_axios.post(
        "/user/register_account",
        registerPayload
      );

      const data = res.data;

      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export default registerUser;
