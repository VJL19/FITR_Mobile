import { createSlice } from "@reduxjs/toolkit";
import {
  deletePostAction,
  getPostAction,
  postUserAction,
} from "../actions/postAction";
import { IPost } from "../utils/types/post.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import { IAuthState } from "utils/types/user.types";
import { RootState } from "store/store";
import * as SecureStore from "expo-secure-store";

interface IPostState {
  error: string;
  status: number;
  isLoading: boolean;
  message: string;
  postItems: IPost[];
  result: IPost[];
}

const initialState: IPostState = {
  error: "",
  status: 0,
  isLoading: false,
  message: "",
  postItems: [],
  result: [],
};

const config = loadConfig();
export const postslice = createApi({
  reducerPath: "user/create_post",
  tagTypes: ["posts"],

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
    addPost: builder.mutation<IPostState, IPost>({
      query: (postData) => ({
        url: "/user/create_post",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["posts"],
    }),
    getPosts: builder.query<IPostState, number | undefined>({
      query: (UserID) => `/user/specific_post/:${UserID}`,
      providesTags: ["posts"],
    }),
    deletePosts: builder.mutation<IPostState, number | undefined>({
      query: (PostID) => ({
        url: `/user/delete_post/:${PostID}`,
        params: { PostID },
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //calling api to post the user data.
    builder.addCase(postUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message;
      state.status = action.payload?.status;
    });
    builder.addCase(postUserAction.pending, (state, action) => {
      state.isLoading = true;
      state.message = { details: "Loading post..." };
      state.status = 202;
    });
    builder.addCase(postUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.error;
      state.status = 400;
    });
    //fetching the user specific post.
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.postItems = action.payload?.result;
    });
    builder.addCase(getPostAction.pending, (state, action) => {
      state.isLoading = true;
      state.message = { details: "Loading user specific post..." };
      state.status = 202;
    });
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.error;
      state.status = 400;
    });
    //for deleting the specific post.
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.postItems = action.payload?.result;
    });
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.isLoading = true;
      state.message = { details: "Loading user deleting a post..." };
      state.status = 202;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.error;
      state.status = 400;
    });
  },
});
export const { useAddPostMutation, useGetPostsQuery, useDeletePostsMutation } =
  postslice;
export default postSlice.reducer;
