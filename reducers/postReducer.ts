import { createSlice } from "@reduxjs/toolkit";
import {
  deletePostAction,
  getPostAction,
  postUserAction,
} from "../actions/postAction";
import { IPost } from "../utils/types/post.types";

interface IPostState {
  error: string;
  status: number;
  isLoading: boolean;
  message: string;
  postItems: IPost[];
}

const initialState: IPostState = {
  error: "",
  status: 0,
  isLoading: false,
  message: "",
  postItems: [],
};

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
export default postSlice.reducer;
