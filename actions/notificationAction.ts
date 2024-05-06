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
    arg: {
      UserID: number;
      PostAuthor: string;
      Username: string;
      NotificationDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await global_axios.post(
        "/user/notifications/notify_comment",
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

const getNotificationAction = createAsyncThunk(
  "/user/notifications",
  async (arg: { UserID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post(
        "/user/notifications/getNotifications",
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

const removeNotificationAction = createAsyncThunk(
  "/user/notifications/remove_notification",
  async (arg: { Username: string }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post(
        "/user/notifications/remove_notification",
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

const removeNotificationCommentAction = createAsyncThunk(
  "/user/notifications/remove_notification_comment",
  async (
    arg: { Username: string; NotificationID: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await global_axios.post(
        "/user/notifications/remove_notification_comment",
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

export {
  notifyLikeAction,
  notifyCommentAction,
  getNotificationAction,
  removeNotificationAction,
  removeNotificationCommentAction,
};
