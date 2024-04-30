import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { KnownError } from "./registerAction";

export interface ILineItems {
  currency: string;
  amount: number;
  name: string;
  quantity: number;
}

export interface CheckoutPayload {
  name: string;
  email: string;
  phone: string;
  line_items: ILineItems[];
  payment_method_types: string[];
}

const processPayment = createAsyncThunk(
  "processPayment/user",
  async (arg: CheckoutPayload, { rejectWithValue }) => {
    const { name, email, phone, line_items, payment_method_types } = arg;
    try {
      const options = {
        method: "POST",
        url: "https://api.paymongo.com/v1/checkout_sessions",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization:
            "Basic c2tfdGVzdF9WQ3pMUk1ldmtkMkEzRnIyelZyNng5TnM6c2tfdGVzdF9WQ3pMUk1ldmtkMkEzRnIyelZyNng5TnM=",
        },
        data: {
          data: {
            attributes: {
              billing: {
                name: name,
                email: email,
                phone: phone,
              },
              send_email_receipt: true,
              show_description: true,
              show_line_items: true,
              line_items: line_items,
              payment_method_types: payment_method_types,
              description: `a test checkout for ${line_items[0].name} subscription.`,
            },
          },
        },
      };
      const res = await axios.request(options);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      rejectWithValue(error.response.data);
    }
  }
);

export default processPayment;
