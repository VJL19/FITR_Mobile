import { getToken, loginUser } from "../actions/authAction";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IUser, { IAuthState, LoginPayload } from "../utils/types/user.types";
import { useEffect } from "react";
import global_axios from "../global/axios";
import SecureStore from "expo-secure-store";
import testToken from "../actions/homeAction";
import loadConfig from "../global/config";
import { RootState } from "store/store";

const initialState: IAuthState = {
  status: 0,
  user: [],
  accessToken: "",
  message: "",
  isAuthenticated: false,
  isLoading: false,
};
const config = loadConfig();

export const authslice = createApi({
  reducerPath: "/authUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState)?.authReducer?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<IAuthState, LoginPayload>({
      query: (loginPayload: LoginPayload) => ({
        url: "/user/login_account",
        method: "POST",
        body: loginPayload,
      }),
    }),
  }),
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    loadToken: (state) => {
      // const ACCESS_TOKEN = "accessToken";
      // useEffect(() => {
      //   const loadAccessToken = async () => {
      //     const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
      //     console.log("access token stored: ", accessToken);
      //     state.accessToken = accessToken;
      //     if (accessToken) {
      //       global_axios.defaults.headers.common[
      //         "Authorization"
      //       ] = `Bearer ${accessToken}`;
      //     }
      //   };
      //   loadAccessToken();
      // }, []);
    },
  },
  extraReducers: (builder) => {
    //for login api call
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.message = action?.payload?.details;
      state.isAuthenticated = true;
      state.isLoading = false;
    }),
      builder.addCase(loginUser.pending, (state, action) => {
        state.status = 202;
        state.message = action?.payload;
        state.isLoading = true;
      });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.message = action?.payload?.details;
      state.status = 400;
      state.isAuthenticated = false;
      state.user = [];
      state.isLoading = false;
    });
    builder.addCase(testToken.fulfilled, (state, action) => {
      state.message = action?.payload?.message;
      state.user = action?.payload?.user;
      state.isAuthenticated = action.payload?.isAuthenticated;
      state.status = 200;
      state.isLoading = false;
    });
    builder.addCase(testToken.pending, (state, action) => {
      state.message = { details: action?.payload };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(testToken.rejected, (state, action) => {
      state.status = 400;
      state.message = { details: "You are unauthorized!" };
      state.isAuthenticated = false;
      state.isLoading = false;
    });
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.accessToken = action?.payload;
      state.status = 200;
    });
    builder.addCase(getToken.pending, (state, action) => {
      state.accessToken = "Loading access token...";
      state.isLoading = true;
      state.status = 202;
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.accessToken = "";
      state.status = 400;
    });
  },
});

export const { loadToken } = authSlice.actions;
export const { useLoginUserMutation } = authslice;
export default authSlice.reducer;
