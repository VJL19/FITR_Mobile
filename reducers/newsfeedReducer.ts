import { createSlice } from "@reduxjs/toolkit";
import {
  checkLikepostAction,
  createPostInFeedAction,
  getAllPostsAction,
  likePostAction,
  unlikePostAction,
} from "../actions/newsfeedAction";
import { INewsFeed } from "../utils/types/newsfeed.types";

interface INewsfeedState {
  message: string;
  error: string;
  status: number;
  isLoading: boolean;
  result: INewsFeed[];
}

const initialState: INewsfeedState = {
  error: "",
  message: "",
  status: 0,
  isLoading: false,
  result: [],
};

const newsfeedSlice = createSlice({
  name: "newsfeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //for getting all the posts in a feed.
    builder.addCase(getAllPostsAction.fulfilled, (state, action) => {
      state.message = action;
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
      state.message = action;
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
      state.message = action;
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
      state.message = action;
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
  },
});

export default newsfeedSlice.reducer;
