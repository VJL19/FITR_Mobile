import { loginUser } from "../actions/authAction";
import { createSlice } from "@reduxjs/toolkit";
import IUser, { IAuthState } from "../utils/types/user.types";
import { useEffect } from "react";
import global_axios from "../global/axios";
import SecureStore from "expo-secure-store";
import testToken from "../actions/homeAction";

const initialState: IAuthState = {
  status: 0,
  user: [],
  accessToken: "",
  message: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
      state.message = action.payload?.details;
      state.isAuthenticated = true;
    }),
      builder.addCase(loginUser.pending, (state, action) => {
        state.status = 202;
        state.message = action?.payload;
      });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.message = action?.payload?.details;
      state.status = 400;
      state.isAuthenticated = false;
      state.user = [];
    });
    builder.addCase(testToken.fulfilled, (state, action) => {
      state.message = action?.payload?.payload;
      state.isAuthenticated = action.payload?.isAuthenticated;
      state.status = 200;
    });
    builder.addCase(testToken.pending, (state, action) => {
      state.message = { details: action?.payload };
      state.status = 202;
    });
    builder.addCase(testToken.rejected, (state, action) => {
      state.status = 400;
      state.message = { details: "You are unauthorized!" };
      state.isAuthenticated = false;
    });
  },
});

export const { loadToken } = authSlice.actions;
export default authSlice.reducer;
