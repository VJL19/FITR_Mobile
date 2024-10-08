import { createAsyncThunk } from "@reduxjs/toolkit";
import global_axios from "../global/axios";
import { AxiosError } from "axios";
import { KnownError } from "./registerAction";
import { INewsFeed } from "../utils/types/newsfeed.types";

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
      return rejectWithValue(error.response.data);
    }
  }
);

const deletePostinFeedAction = createAsyncThunk(
  "user/remove_postfeed",
  async (PostID: number, { rejectWithValue }) => {
    try {
      const res = await global_axios.delete(`/user/remove_postfeed:${PostID}`);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

const likePostAction = createAsyncThunk(
  "user/like_post",
  async (arg: { UserID: number; NewsfeedID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/like_post", arg);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const unlikePostAction = createAsyncThunk(
  "user/unlike_post",
  async (arg: { UserID: number; NewsfeedID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/unlike_post", arg);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const checkLikepostAction = createAsyncThunk(
  "user/check_likepost",
  async (arg: { UserID: number; NewsfeedID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/check_likepost", arg);
      const data = res.data;
      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export {
  createPostInFeedAction,
  getAllPostsAction,
  likePostAction,
  unlikePostAction,
  checkLikepostAction,
  deletePostinFeedAction,
};
