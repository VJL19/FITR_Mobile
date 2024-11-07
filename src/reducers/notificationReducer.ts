import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotifications } from "../utils/types/notifications.types";
import {
  getNotificationAction,
  notifyCommentAction,
  notifyLikeAction,
  removeNotificationAction,
} from "../actions/notificationAction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import * as SecureStore from "expo-secure-store";

interface INotificationState {
  message: string;
  error: string;
  status: number;
  isLoading: boolean;
  result: INotifications[];
  notificationCount: string | undefined;
  viewNotificationPayload: INotifications;
  expoNotifToken: string | undefined | null;
}

const initialState: INotificationState = {
  message: "",
  error: "",
  status: 0,
  isLoading: false,
  result: [],
  notificationCount: 0,
  viewNotificationPayload: {
    UserID: 0,
    PostID: 0,
    PostAuthor: "",
    NotificationID: 0,
    NotificationText: "",
    isMarkRead: "",
    NotifBy: "",
    NotificationType: "",
    NotificationDate: "",
    NotificationCount: "",
    NotificationAuthor: "",
  },
  expoNotifToken: "",
};

const config = loadConfig();

export const notificationApi = createApi({
  reducerPath: "/user/notifications",
  tagTypes: ["notifications"],
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
    markAsReadNotifications: builder.mutation<
      INotificationState,
      { UserID: number | undefined; NotificationID: number | undefined }
    >({
      query: (arg) => ({
        url: "/user/notifications/readNotifications",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["notifications"],
    }),
    markAsUnreadNotifications: builder.mutation<
      INotificationState,
      { UserID: number | undefined; NotificationID: number | undefined }
    >({
      query: (arg) => ({
        url: `/user/notifications/unreadNotifications`,
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["notifications"],
    }),
    getAllNotifications: builder.query<INotificationState, number | undefined>({
      query: (UserID) => `/user/notifications/getNotifications/:${UserID}`,
      providesTags: ["notifications"],
    }),
    getAllNotificationsCount: builder.query<
      INotificationState,
      number | undefined
    >({
      query: (UserID) => `/user/notifications/getNotificationsCount/:${UserID}`,
      providesTags: ["notifications"],
    }),
  }),
});
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationCount: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.notificationCount = action.payload;
    },

    setViewNotification: (state, action: PayloadAction<INotifications>) => {
      state.viewNotificationPayload = action.payload;
    },
    setExpoNotifToken: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      state.expoNotifToken = action.payload;
    },
  },
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

export const { setNotificationCount, setViewNotification, setExpoNotifToken } =
  notificationSlice.actions;
export const {
  useMarkAsReadNotificationsMutation,
  useMarkAsUnreadNotificationsMutation,
  useGetAllNotificationsQuery,
  useGetAllNotificationsCountQuery,
} = notificationApi;
export default notificationSlice.reducer;
