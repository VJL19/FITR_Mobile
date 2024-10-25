import { createSlice } from "@reduxjs/toolkit";
import {
  checkLikepostAction,
  createPostInFeedAction,
  deletePostinFeedAction,
  getAllPostsAction,
  likePostAction,
  unlikePostAction,
} from "../actions/newsfeedAction";
import { IComments, INewsFeed } from "../utils/types/newsfeed.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import * as SecureStore from "expo-secure-store";
import { INotifications } from "utils/types/notifications.types";
import { ILikes } from "utils/types/likes.types";

interface INewsfeedState {
  message: string;
  error: string;
  status: number;
  isLoading: boolean;
  result: INewsFeed[];
}
interface ILikeState {
  message: string;
  error: string;
  status: number;
  isLoading: boolean;
  result: ILikes[];
}
interface ICommentState {
  message: string;
  error: string;
  status: number;
  isLoading: boolean;
  result: IComments[];
}

const initialState: INewsfeedState = {
  error: "",
  message: "",
  status: 0,
  isLoading: false,
  result: [],
};

const config = loadConfig();
export const newsfeedslice = createApi({
  reducerPath: "user/newsfeed",
  tagTypes: ["newsfeed"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: async (headers: Headers) => {
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
    addPostInFeed: builder.mutation<INewsfeedState, INewsFeed>({
      query: (arg) => ({
        url: "/user/newsfeed/create_postfeed",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    deletePostInFeed: builder.mutation<INewsfeedState, number | undefined>({
      query: (PostID) => ({
        url: `/user/newsfeed/remove_postfeed/:${PostID}`,
        params: { PostID },
        method: "DELETE",
      }),
      invalidatesTags: ["newsfeed"],
    }),
    getAllPostInFeed: builder.query<INewsfeedState, string | undefined>({
      query: (SubscriptionType) =>
        `/user/newsfeed/all_posts/:${SubscriptionType}`,
      providesTags: ["newsfeed"],
    }),
    getTotalLikes: builder.query<ILikeState, number | undefined>({
      query: (NewsfeedID) => `/user/newsfeed/total_likes/:${NewsfeedID}`,
      providesTags: ["newsfeed"],
    }),
    getTotalComments: builder.query<ICommentState, number | undefined>({
      query: (NewsfeedID) => `/user/newsfeed/total_comments/:${NewsfeedID}`,
      providesTags: ["newsfeed"],
    }),
    likePostInFeed: builder.mutation<
      INewsfeedState,
      { UserID: number; NewsfeedID: number }
    >({
      query: (arg) => ({
        url: "/user/newsfeed/like_post",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    notifyLikePostInFeed: builder.mutation<
      INewsfeedState,
      {
        UserID: number;
        PostID: number;
        NotificationAuthor: string;
        Username: string;
        NotificationDate: string;
        PostTitle: string;
      }
    >({
      query: (arg) => ({
        url: "/user/notifications/notify_like",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    unlikePostInFeed: builder.mutation<
      INewsfeedState,
      { UserID: number; NewsfeedID: number }
    >({
      query: (arg) => ({
        url: "/user/newsfeed/unlike_post",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    removeNotificationLike: builder.mutation<
      INewsfeedState,
      { Username: string; PostID: number }
    >({
      query: (arg) => ({
        url: "/user/notifications/remove_notification",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    checkLikePost: builder.mutation<
      ILikeState,
      { UserID: number; NewsfeedID: number }
    >({
      query: (arg) => ({
        url: "/user/newsfeed/check_likepost",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    commentPostInFeed: builder.mutation<
      ICommentState,
      {
        CommentText: string;
        UserID: number;
        NewsfeedID: number;
        CommentDate: string;
      }
    >({
      query: (arg) => ({
        url: "/user/newsfeed/comment_post",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    getAllComments: builder.query<ICommentState, number | undefined>({
      query: (NewsfeedID) => `/user/newsfeed/all_comments/:${NewsfeedID}`,
      providesTags: ["newsfeed"],
    }),
    notifyCommentPostInFeed: builder.mutation<
      INewsfeedState,
      {
        UserID: number;
        PostID: number;
        NotificationAuthor: string;
        Username: string;
        NotificationDate: string;
        PostTitle: string;
      }
    >({
      query: (arg) => ({
        url: "/user/notifications/notify_comment",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["newsfeed"],
    }),
    deleteLikes: builder.mutation<INewsfeedState, number | undefined>({
      query: (NewsfeedID) => ({
        url: `/user/newsfeed/remove_user_likes/:${NewsfeedID}`,
        method: "DELETE",
        params: { NewsfeedID },
      }),
      invalidatesTags: ["newsfeed"],
    }),
    deleteComments: builder.mutation<INewsfeedState, number | undefined>({
      query: (NewsfeedID) => ({
        url: `/user/newsfeed/remove_user_comments/:${NewsfeedID}`,
        method: "DELETE",
        params: { NewsfeedID },
      }),
      invalidatesTags: ["newsfeed"],
    }),
    deleteNotifications: builder.mutation<INewsfeedState, number | undefined>({
      query: (PostID) => ({
        url: `/user/notifications/remove_user_notifications/:${PostID}`,
        method: "DELETE",
        params: { PostID },
      }),
      invalidatesTags: ["newsfeed"],
    }),
  }),
});

const newsfeedSlice = createSlice({
  name: "newsfeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //for getting all the posts in a feed.
    builder.addCase(getAllPostsAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.result = action.payload?.result;
      state.isLoading = false;
    });
    builder.addCase(getAllPostsAction.pending, (state, action) => {
      state.message = { details: "Loading in getting posts in a feed" };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(getAllPostsAction.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.status = 400;
      state.isLoading = false;

      state.result = [];
    });
    //for the create post in a feed action.
    builder.addCase(createPostInFeedAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.result = action.payload?.result;
      state.isLoading = false;
    });
    builder.addCase(createPostInFeedAction.pending, (state, action) => {
      state.message = { details: "Loading in creating post in a feed." };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(createPostInFeedAction.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.status = 400;
      state.isLoading = false;
      state.result = [];
    });
    //for the liking the post in a feed action.
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.result = action.payload?.result;
      state.isLoading = false;
    });
    builder.addCase(likePostAction.pending, (state, action) => {
      state.message = { details: "Loading in like post in a feed." };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.status = 400;
      state.isLoading = false;
      state.result = [];
    });
    //for the unliking the post in a feed action.
    builder.addCase(unlikePostAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.result = action.payload?.result;
      state.isLoading = false;
    });
    builder.addCase(unlikePostAction.pending, (state, action) => {
      state.message = { details: "Loading in unlike post in a feed." };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(unlikePostAction.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.status = 400;
      state.isLoading = false;
      state.result = [];
    });
    //for the checking the post if liked already in a feed action.
    builder.addCase(checkLikepostAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.result = action.payload?.result;
      state.isLoading = false;
    });
    builder.addCase(checkLikepostAction.pending, (state, action) => {
      state.message = {
        details: "Loading in checking if like post in a feed.",
      };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(checkLikepostAction.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.status = 400;
      state.isLoading = false;
      state.result = [];
    });
    //for deleting the post in a feed action
    builder.addCase(deletePostinFeedAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.result = action.payload?.result;
      state.isLoading = false;
    });
    builder.addCase(deletePostinFeedAction.pending, (state, action) => {
      state.message = {
        details: "Loading in deleting post in a feed.",
      };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(deletePostinFeedAction.rejected, (state, action) => {
      state.error = action.payload?.error;
      state.status = 400;
      state.isLoading = false;
      state.result = [];
    });
  },
});

export const {
  useAddPostInFeedMutation,
  useDeletePostInFeedMutation,
  useGetAllPostInFeedQuery,
  useLikePostInFeedMutation,
  useNotifyLikePostInFeedMutation,
  useUnlikePostInFeedMutation,
  useRemoveNotificationLikeMutation,
  useCheckLikePostMutation,
  useCommentPostInFeedMutation,
  useGetTotalCommentsQuery,
  useGetTotalLikesQuery,
  useGetAllCommentsQuery,
  useNotifyCommentPostInFeedMutation,
  useDeleteLikesMutation,
  useDeleteCommentsMutation,
  useDeleteNotificationsMutation,
} = newsfeedslice;
export default newsfeedSlice.reducer;
