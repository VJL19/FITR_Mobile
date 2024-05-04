import { createAsyncThunk } from "@reduxjs/toolkit";
import global_axios from "../global/axios";
import { AxiosError } from "axios";
import { KnownError } from "./registerAction";

const createPostInFeedAction = createAsyncThunk(
  "user/create_postfeed",
  async (arg: INewsFeed, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/create_postfeed", arg);
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

const getAllPostsAction = createAsyncThunk(
  "user/all_posts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await global_axios.get("/user/all_posts");
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

const getAllCommentsAction = createAsyncThunk(
  "user/all_comments",
  async (NewsfeedID: number, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/all_comments", { NewsfeedID });
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

const likePostAction = createAsyncThunk(
  "user/like_post",
  async (arg: { UserID: number; NewsfeedID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/like_post", { arg });
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

const unlikePostAction = createAsyncThunk(
  "user/unlike_post",
  async (arg: { UserID: number; NewsfeedID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/unlike_post", { arg });
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

const commentPostAction = createAsyncThunk(
  "user/comment_post",
  async (
    arg: { NewsfeedID: number; UserID: number; CommentText: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await global_axios.post("/user/comment_post", { arg });

      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      rejectWithValue(error.response.data);
    }
  }
);

export {
  createPostInFeedAction,
  getAllPostsAction,
  getAllCommentsAction,
  likePostAction,
  unlikePostAction,
  commentPostAction,
};
