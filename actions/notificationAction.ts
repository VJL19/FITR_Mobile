import { createAsyncThunk } from "@reduxjs/toolkit";
import global_axios from "../global/axios";
import { AxiosError } from "axios";
import { KnownError } from "./registerAction";

const notifyLikeAction = createAsyncThunk(
  "/user/notify_like",
  async (
    arg: { UserID: number; PostAuthor: string; Username: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await global_axios.post(
        "/user/notifications/notify_like",
        arg
      );
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

const notifyCommentAction = createAsyncThunk(
  "/user/notify_comment",
  async (
    arg: { UserID: number; PostAuthor: string; Username: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await global_axios.post("/user/notify_comment", arg);
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

const getNotificationAction = createAsyncThunk(
  "/user/notifications",
  async (arg: { UserID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/getNotifications", arg);
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

export { notifyLikeAction, notifyCommentAction, getNotificationAction };
