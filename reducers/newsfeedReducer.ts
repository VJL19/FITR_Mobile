import { createSlice } from "@reduxjs/toolkit";
import {
  createPostInFeedAction,
  getAllPostsAction,
} from "../actions/newsfeedAction";

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
  },
});

export default newsfeedSlice.reducer;
