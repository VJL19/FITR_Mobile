import { createAsyncThunk } from "@reduxjs/toolkit";
import { KnownError } from "./registerAction";
import { AxiosError } from "axios";
import global_axios from "../global/axios";
import { LoginPayload } from "../utils/types/user.types";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const ACCESS_TOKEN = "accessToken";

const setToken = async (token: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN, token);
};

const loginUser = createAsyncThunk(
  "/user/login_user",
  async (loginPayload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/login_account", loginPayload);

      const data = res.data;

      await setToken(data?.accessToken);
      global_axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// const logoutUser = createAsyncThunk(
//   "/user/logout_user",
//   async (_, { rejectWithValue }) => {
//     try {

//         const res = await global_axios.
//     } catch (err) {
//       const error = err as AxiosError<KnownError>;
//       if (!error.response) {
//         throw err;
//       }

//       return rejectWithValue(error.response.data)
//     }
//   }
// );

export { loginUser };
