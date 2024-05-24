import { getToken, loginUser } from "../actions/authAction";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IUser, { IAuthState, LoginPayload } from "../utils/types/user.types";
import * as SecureStore from "expo-secure-store";
import testToken from "../actions/homeAction";
import loadConfig from "../global/config";
import { RootState } from "store/store";
import { State } from "react-native-gesture-handler";
import { IAccountSetup } from "utils/types/form.types";

interface IPersonalInfoField {
  Age: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
}
interface IContactInfoField {
  ContactNumber: string;
  Email: string;
  Height: string;
  Weight: string;
}

const initialState: IAuthState = {
  status: 0,
  user: [],
  accessToken: "",
  message: "",
  isAuthenticated: false,
  isLoading: false,
  personalInfo: {
    Age: "",
    FirstName: "",
    LastName: "",
    MiddleName: "",
  },
  contactInfo: {
    ContactNumber: "",
    Email: "",
    Height: "",
    Weight: "",
  },
  accountInfo: {
    Username: "",
    Password: "",
    ConfirmPassword: "",
    Gender: "",
  },
};
const config = loadConfig();

async function simulateLoading(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const authslice = createApi({
  reducerPath: "/authUsers",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: async (headers: Headers, { getState }) => {
      // const token = (getState() as RootState).authReducer.accessToken;
      const token = await SecureStore.getItemAsync("accessToken");
      // console.log("state", getState());
      console.log("in auth slice", token);
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
    getAccessToken: builder.query<IAuthState, void>({
      query: () => "/user/dashboard",
    }),
  }),
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      // const storeToken = async () => {
      //   await SecureStore.setItemAsync("accessToken", payload);
      // };
      // storeToken();
      state.accessToken = payload;
      state.isAuthenticated = true;
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    getStoredToken: (state) => {
      // const getStoreToken = async () => {
      //   const token = await SecureStore.getItemAsync("accessToken");
      //   if (token) {
      //     state.accessToken = token;
      //     state.isAuthenticated = true;
      //   }
      // };
      // getStoreToken();
    },
    deleteToken: (state) => {
      const deleteStoreToken = async () => {
        await SecureStore.deleteItemAsync("accessToken");
      };
      deleteStoreToken();
      state.accessToken = "";
      state.isAuthenticated = false;
    },
    setPersonalInfoFields: (
      state,
      action: PayloadAction<IPersonalInfoField>
    ) => {
      state.personalInfo = action.payload;
    },
    setContactInfoFields: (state, action: PayloadAction<IContactInfoField>) => {
      state.contactInfo = action.payload;
    },
    setAccountInfoFields: (state, action: PayloadAction<IAccountSetup>) => {
      state.accountInfo = action.payload;
    },
    clearFormFields: (state) => {
      state.personalInfo = {
        Age: "",
        FirstName: "",
        LastName: "",
        MiddleName: "",
      };
      state.contactInfo = {
        ContactNumber: "",
        Email: "",
        Height: "",
        Weight: "",
      };
      state.accountInfo = {
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Gender: "",
      };
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

export const {
  loadToken,
  setToken,
  deleteToken,
  getStoredToken,
  setAuthenticated,
  setPersonalInfoFields,
  setContactInfoFields,
  setAccountInfoFields,
  clearFormFields,
} = authSlice.actions;
export const { useLoginUserMutation, useGetAccessTokenQuery } = authslice;
export default authSlice.reducer;
