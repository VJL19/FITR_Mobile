import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import global_axios from "../global/axios";
import { KnownError } from "./registerAction";

const commentPostAction = createAsyncThunk(
  "user/comment_post",
  async (
    arg: {
      CommentText: string;
      UserID: number;
      NewsfeedID: number;
      CommentDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await global_axios.post("/user/comment_post", arg);

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

const removeUserCommentAction = createAsyncThunk(
  "/user/remove_comment",
  async (arg: { CommentID: number }, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/remove_comment", arg);
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      rejectWithValue(error.response.data);
    }
  }
);

export { getAllCommentsAction, commentPostAction, removeUserCommentAction };
