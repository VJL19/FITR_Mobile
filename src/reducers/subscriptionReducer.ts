import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import processPayment, { CheckoutPayload } from "../actions/subscriptionAction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISubscriptions } from "utils/types/subscriptions.types";
import loadConfig from "global/config";
import * as SecureStore from "expo-secure-store";

interface ICreatePaymentState {
  UserID: number;
  SubscriptionAmount: number;
  SubscriptionBy: string;
  SubscriptionType: string;
  SubscriptionMethod: string;
  SubscriptionEntryDate: string;
}

interface ISubscriptionState {
  status: number;
  error: string;
  details: string;
  payment_intent: string;
  isLoading: boolean;
  checkout_url: string;
  confirmationUrl: string;
  clientKey: string;
  message: string;
  result: ISubscriptions[];
  checkOutId: string;
  SubscriptionExpectedEnd: string;
  checkOutStatus: string;
  createPayment: ICreatePaymentState;
  viewSubscriptionPayload: ISubscriptions;
}

const initialState: ISubscriptionState = {
  details: "",
  error: "",
  status: 0,
  isLoading: false,
  payment_intent: "",
  checkout_url: "",
  confirmationUrl: "",
  createPayment: {
    UserID: 0,
    SubscriptionAmount: 0,
    SubscriptionBy: "",
    SubscriptionType: "",
    SubscriptionMethod: "",
    SubscriptionEntryDate: "",
  },
  clientKey: "",
  message: "",
  result: [],
  checkOutId: "",
  SubscriptionExpectedEnd: "",
  checkOutStatus: "",
  viewSubscriptionPayload: {
    UserID: 0,
    SubscriptionID: 0,
    SubscriptionAmount: 0,
    SubscriptionUploadedImage: undefined,
    SubscriptionMethod: "",
    SubscriptionBy: "",
    SubscriptionStatus: "",
    SubscriptionType: "",
    SubscriptionEntryDate: "",
    ContactNumber: "",
    Email: "",
    AttendanceID: 0,
    SubscriptionExpectedEnd: "",
    IsPaid: false,
  },
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
    processOnlinePayment: builder.mutation<any, CheckoutPayload>({
      query: ({ name, email, phone, line_items, payment_method_types }) => ({
        url: "https://api.paymongo.com/v1/checkout_sessions",
        method: "POST",
        body: {
          data: {
            attributes: {
              billing: {
                name: name,
                email: email,
                phone: phone,
              },
              line_items: line_items,
              payment_method_types: payment_method_types,
              description: `a test checkout for ${line_items[0].name} subscription.`,
              send_email_receipt: true,
              show_description: true,
              show_line_items: true,
              success_url: `${config.BASE_URL}user/subscription/success_payment`,
            },
          },
        },
      }),
      invalidatesTags: ["subscriptions"],
    }),
    expireCheckoutSession: builder.mutation<any, string | undefined>({
      query: (checkout_session_id) => ({
        url: `https://api.paymongo.com/v1/checkout_sessions/${checkout_session_id}/expire`,
        method: "POST",
      }),
      invalidatesTags: ["subscriptions"],
    }),
    retrieveCheckoutSession: builder.mutation<any, string | undefined>({
      query: (checkout_session_id) => ({
        url: `https://api.paymongo.com/v1/checkout_sessions/${checkout_session_id}`,
        method: "GET",
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
    getSessionAlreadyPaid: builder.mutation<
      ISubscriptionState,
      number | undefined
    >({
      query: (UserID) => ({
        url: `/user/subscription/check_session_paid:${UserID}`,
        method: "GET",
      }),
      invalidatesTags: ["subscriptions"],
    }),
    getMonthlyAlreadyPaid: builder.mutation<
      ISubscriptionState,
      number | undefined
    >({
      query: (UserID) => ({
        url: `/user/subscription/check_monthly_paid:${UserID}`,
        method: "GET",
      }),
      invalidatesTags: ["subscriptions"],
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
  initialState: initialState,
  reducers: {
    createSubscription: (state, action: PayloadAction<ICreatePaymentState>) => {
      const {
        UserID,
        SubscriptionAmount,
        SubscriptionBy,
        SubscriptionEntryDate,
        SubscriptionMethod,
        SubscriptionType,
      } = action.payload;

      state.createPayment.UserID = UserID;
      state.createPayment.SubscriptionAmount = SubscriptionAmount;
      state.createPayment.SubscriptionBy = SubscriptionBy;
      state.createPayment.SubscriptionEntryDate = SubscriptionEntryDate;
      state.createPayment.SubscriptionMethod = SubscriptionMethod;
      state.createPayment.SubscriptionType = SubscriptionType;
    },
    deleteSubscription: (state) => {
      state.createPayment.UserID = 0;
      state.createPayment.SubscriptionAmount = 0;
      state.createPayment.SubscriptionBy = "";
      state.createPayment.SubscriptionEntryDate = "";
      state.createPayment.SubscriptionMethod = "";
      state.createPayment.SubscriptionType = "";
    },
    setCheckOutId: (state, action: PayloadAction<string>) => {
      state.checkOutId = action.payload;
    },
    deleteCheckOutId: (state) => {
      state.checkOutId = "";
    },

    setCheckOutUrl: (state, action: PayloadAction<string>) => {
      state.checkout_url = action.payload;
    },
    setClientKey: (state, action: PayloadAction<string>) => {
      state.clientKey = action.payload;
    },
    setViewSubscriptionPayload: (
      state,
      action: PayloadAction<ISubscriptions>
    ) => {
      state.viewSubscriptionPayload = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(processPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.details = action.payload?.data?.attributes;
      state.checkOutId = action?.payload?.data?.id;
      state.payment_intent = action.payload?.data?.attributes?.payment_intent;
      state.status = 200;
      state.checkout_url = action.payload?.data?.attributes?.checkout_url;
      state.confirmationUrl = action.payload?.data?.attributes?.checkout_url;
      state.checkOutStatus = action.payload?.data?.attributes?.status;
    });
    builder.addCase(processPayment.pending, (state, action) => {
      state.isLoading = true;
      state.details = { details: "Loading...." };
      state.status = 202;
    });
    builder.addCase(processPayment.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.status = 400;
    });
  },
});

export default subscriptionSlice.reducer;

export const {
  createSubscription,
  setCheckOutId,
  setCheckOutUrl,
  setViewSubscriptionPayload,
  setClientKey,
  deleteCheckOutId,
  deleteSubscription,
} = subscriptionSlice.actions;
export const {
  useGetSpecificSubscriptionQuery,
  useGetSessionAlreadyPaidMutation,
  useGetMonthlyAlreadyPaidMutation,
  useAddSubscriptionMutation,
  useProcessOnlinePaymentMutation,
  useRetrieveCheckoutSessionMutation,
  useExpireCheckoutSessionMutation,
  useGetSubscriptionHistoryQuery,
  useGetSubscriptionHistoryByDateMutation,
} = subscriptionApi;
