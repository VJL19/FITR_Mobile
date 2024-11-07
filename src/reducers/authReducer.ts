import { getToken, loginUser } from "../actions/authAction";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IUser, {
  IAuthState,
  IChangeAccount,
  LoginPayload,
} from "../utils/types/user.types";
import * as SecureStore from "expo-secure-store";
import testToken from "../actions/homeAction";
import loadConfig from "../global/config";
import { RootState } from "store/store";
import { State } from "react-native-gesture-handler";
import { IAccountSetup } from "utils/types/form.types";
import { string } from "joi";

interface IPersonalInfoField {
  Age: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Birthday: string;
}
interface IContactInfoField {
  ContactNumber: string;
  Email: string;
  Height: string;
  Weight: string;
  Address: string;
}

interface IEmailState {
  code: number;
  result: { message: string; code: number };
}

interface IForgotPasswordState {
  error: string;
  status: number;
  message: string;
  result: IUser[];
}

interface IChangePasswordState {
  error: string;
  status: number;
  message: string;
  result: unknown[];
}

interface IForgotPasswordField {
  Email: string;
  Username: string;
}

interface IExpoNotifState {
  error: string;
  message: string;
  status: number;
  result: string;
}

interface IActivateUserAccount {
  error: string;
  message: string;
  status: number;
  email: string;
}
const initialState: IAuthState = {
  status: 0,
  user: [],
  accessToken: "",
  OTPToken: 0,
  message: "",
  isAuthenticated: false,
  isLoading: false,
  personalInfo: {
    Birthday: "",
    Age: "",
    FirstName: "",
    LastName: "",
    MiddleName: "",
  },
  contactInfo: {
    Address: "",
    ContactNumber: "",
    Email: "",
    Height: "",
    Weight: "",
  },
  accountInfo: {
    SubscriptionType: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
    Gender: "",
  },
  forgotPasswordInfo: {
    Email: "",
    Username: "",
  },
  email: "",
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
      invalidatesTags: ["auth"],
    }),
    getAccessToken: builder.query<IAuthState, void>({
      query: () => "/user/dashboard",
      providesTags: ["auth"],
    }),
    changeAccount: builder.mutation<IAuthState, IChangeAccount>({
      query: (arg) => ({
        url: "/user/edit_account",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
    sendEmail: builder.mutation<IEmailState, { Email: string }>({
      query: (arg) => ({
        url: "/user/send_email",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
    addExpoNotifToken: builder.mutation<
      IExpoNotifState,
      { Email: string | undefined; ExpoNotifToken: string | undefined | null }
    >({
      query: (arg) => ({
        url: "/user/add_token",
        method: "POST",
        body: arg,
      }),

      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation<IForgotPasswordState, { Email: string }>({
      query: (arg) => ({
        url: "/user/forgot_password",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
    changePassword: builder.mutation<
      IChangePasswordState,
      { Email: string; Password: string; ConfirmPassword: string }
    >({
      query: (arg) => ({
        url: "/user/change_password",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
    activateUserAccount: builder.mutation<
      IActivateUserAccount,
      { Email: string }
    >({
      query: (arg) => ({
        url: "/user/activate_account",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.query<IAuthState, void>({
      query: () => "/user/logout_account",
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
    setOTPToken: (state, { payload }) => {
      state.OTPToken = payload;
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
        Birthday: "",
      };
      state.contactInfo = {
        ContactNumber: "",
        Email: "",
        Height: "",
        Weight: "",
        Address: "",
      };
      state.accountInfo = {
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Gender: "",
        SubscriptionType: "",
      };
    },
    setForgotPasswordFields: (
      state,
      action: PayloadAction<IForgotPasswordField>
    ) => {
      state.forgotPasswordInfo = action.payload;
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
    setUserEmail: (state, action) => {
      state.email = action.payload;
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
  setOTPToken,
  deleteToken,
  getStoredToken,
  setAuthenticated,
  setPersonalInfoFields,
  setContactInfoFields,
  setAccountInfoFields,
  setForgotPasswordFields,
  clearFormFields,
  setUserEmail,
} = authSlice.actions;
export const {
  useLoginUserMutation,
  useGetAccessTokenQuery,
  useAddExpoNotifTokenMutation,
  useChangeAccountMutation,
  useChangePasswordMutation,
  useSendEmailMutation,
  useForgotPasswordMutation,
  useActivateUserAccountMutation,
  useLogoutQuery,
} = authslice;
export default authSlice.reducer;
