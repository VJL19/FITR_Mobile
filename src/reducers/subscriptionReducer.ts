import { createSlice } from "@reduxjs/toolkit";
import processPayment from "../actions/subscriptionAction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISubscriptions } from "utils/types/subscriptions.types";
import loadConfig from "global/config";
import * as SecureStore from "expo-secure-store";

interface ISubscriptionState {
  status: number;
  error: string;
  details: string;
  payment_intent: string;
  isLoading: boolean;
  checkout_url: string;
  confirmationUrl: string;
  message: string;
  result: ISubscriptions[];
}

const initialState: ISubscriptionState = {
  details: "",
  error: "",
  status: 0,
  isLoading: false,
  payment_intent: "",
  checkout_url: "",
  confirmationUrl: "",
};

const config = loadConfig();

export const subscriptionApi = createApi({
  reducerPath: "/user/subscriptions",
  tagTypes: ["subscriptions"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,

    prepareHeaders: async (headers: Headers, { getState }) => {
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
    addSubscription: builder.mutation<ISubscriptionState, ISubscriptions>({
      query: (arg) => ({
        url: "/user/subscription/create_subscription",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["subscriptions"],
    }),
    getSpecificSubscription: builder.query<
      ISubscriptionState,
      number | undefined
    >({
      query: (UserID) => `/user/subscription/specific_subscription:${UserID}`,
      providesTags: ["subscriptions"],
    }),
    getSubscriptionHistory: builder.query<
      ISubscriptionState,
      number | undefined
    >({
      query: (UserID) => `/user/subscription/subscription_history:${UserID}`,
      providesTags: ["subscriptions"],
    }),
    getSubscriptionHistoryByDate: builder.mutation<
      ISubscriptionState,
      { UserID: number; selectedDate: string }
    >({
      query: (arg) => ({
        url: "/user/subscription/subscription_history_by_date",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["subscriptions"],
    }),
  }),
});

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(processPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.details = action.payload?.data?.attributes;
      state.payment_intent = action.payload?.data?.attributes?.payment_intent;
      state.status = 200;
      state.checkout_url = action.payload?.data?.attributes?.checkout_url;
      state.confirmationUrl = action.payload?.data?.attributes?.checkout_url;
    });
    builder.addCase(processPayment.pending, (state, action) => {
      state.isLoading = true;
      state.details = { details: "Loading...." };
      state.status = 202;
    });
    builder.addCase(processPayment.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.isLoading = false;
      state.status = 400;
    });
  },
});

export default subscriptionSlice.reducer;
export const {
  useGetSpecificSubscriptionQuery,
  useAddSubscriptionMutation,
  useGetSubscriptionHistoryQuery,
  useGetSubscriptionHistoryByDateMutation,
} = subscriptionApi;
