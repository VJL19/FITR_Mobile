import { createSlice } from "@reduxjs/toolkit";
import {
  commentPostAction,
  getAllCommentsAction,
} from "../actions/commentAction";
import { IComments } from "../utils/types/newsfeed.types";

interface ICommentState {
  message: string;
  status: number;
  error: string;
  isLoading: boolean;

  comments: IComments[];
}

const initialState: ICommentState = {
  message: "",
  error: "",
  status: 0,
  isLoading: false,
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCommentsAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.comments = action.payload?.result;
      state.isLoading = false;
    });
    builder.addCase(getAllCommentsAction.pending, (state, action) => {
      state.message = { details: "Loading comments in a posts..." };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(getAllCommentsAction.rejected, (state, action) => {
      state.message = action.payload?.message;
      state.error = action.payload?.error;
      state.isLoading = false;
      state.comments = [];
      state.status = 400;
    });
    //for posting a comment in a post.
    builder.addCase(commentPostAction.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.status = action.payload?.status;
      state.isLoading = false;
    });
    builder.addCase(commentPostAction.pending, (state, action) => {
      state.message = { details: "Loading creating comment in a posts..." };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(commentPostAction.rejected, (state, action) => {
      state.message = action.payload?.message;
      state.error = action.payload?.error;
      state.isLoading = false;
      state.status = 400;
    });
  },
});

export default commentSlice.reducer;
