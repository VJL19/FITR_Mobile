import { createSlice } from "@reduxjs/toolkit";
import { INotifications } from "../utils/types/notifications.types";
import {
  getNotificationAction,
  notifyCommentAction,
  notifyLikeAction,
  removeNotificationAction,
} from "../actions/notificationAction";

interface INotificationState {
  message: string;
  error: string;
  status: number;
  isLoading: boolean;
  result: INotifications[];
}

const initialState: INotificationState = {
  message: "",
  error: "",
  status: 0,
  isLoading: false,
  result: [],
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //reducers for notifying user for like.
    builder.addCase(notifyLikeAction.fulfilled, (state, action) => {
      state.message = action;
      state.result = action.payload?.result;
      state.isLoading = false;
      state.status = action.payload?.status;
    });
    builder.addCase(notifyLikeAction.pending, (state, action) => {
      state.message = { details: "Loading in notify like action..." };
      state.isLoading = true;
      state.status = 202;
    });
    builder.addCase(notifyLikeAction.rejected, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.isLoading = false;
      state.result = [];
    });
    //reducers for notifying user for comment.
    builder.addCase(notifyCommentAction.fulfilled, (state, action) => {
      state.message = action;
      state.result = action.payload?.result;
      state.isLoading = false;
      state.status = action.payload?.status;
    });
    builder.addCase(notifyCommentAction.pending, (state, action) => {
      state.message = { details: "Loading in notify comment action..." };
      state.isLoading = true;
      state.status = 202;
    });
    builder.addCase(notifyCommentAction.rejected, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.isLoading = false;
      state.result = [];
    });

    //reducers for removing the user for like.
    builder.addCase(removeNotificationAction.fulfilled, (state, action) => {
      state.message = action;
      state.result = action.payload?.result;
      state.isLoading = false;
      state.status = action.payload?.status;
    });
    builder.addCase(removeNotificationAction.pending, (state, action) => {
      state.message = {
        details: "Loading in removing notification like action...",
      };
      state.isLoading = true;
      state.status = 202;
    });
    builder.addCase(removeNotificationAction.rejected, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.isLoading = false;
      state.result = [];
    });
    //reducers for getting all notifications in user.
    builder.addCase(getNotificationAction.fulfilled, (state, action) => {
      state.message = action;
      state.result = action.payload?.result;
      state.isLoading = false;
      state.status = action.payload?.status;
    });
    builder.addCase(getNotificationAction.pending, (state, action) => {
      state.message = {
        details: "Loading in getting notification likes, and comment action...",
      };
      state.isLoading = true;
      state.status = 202;
    });
    builder.addCase(getNotificationAction.rejected, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.isLoading = false;
      state.result = [];
    });
  },
});

export default notificationSlice.reducer;
