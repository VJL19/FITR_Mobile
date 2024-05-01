import { createSlice } from "@reduxjs/toolkit";
import processPayment from "../actions/subscriptionAction";

interface ISubscriptionState {
  status: number;
  error: string;
  details: string;
  payment_intent: string;
  isLoading: boolean;
  checkout_url: string;
  confirmationUrl: string;
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
