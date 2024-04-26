import { createAsyncThunk } from "@reduxjs/toolkit";
import global_axios from "../global/axios";
import { AxiosError } from "axios";
import { KnownError } from "./registerAction";

const testToken = createAsyncThunk(
  "user/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await global_axios.get("/user/dashboard");
      const data = res.data;

      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export default testToken;
