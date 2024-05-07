import { createAsyncThunk } from "@reduxjs/toolkit";
import global_axios from "../global/axios";
import { AxiosError } from "axios";
import { KnownError } from "./registerAction";
import { IPost } from "../utils/types/post.types";

const postUserAction = createAsyncThunk(
  "/user/create_post",
  async (postData: IPost, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/create_post", postData);

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

const getPostAction = createAsyncThunk(
  "/user/get_post",
  async (UserID: number, { rejectWithValue }) => {
    try {
      const res = await global_axios.post("/user/specific_post", { UserID });
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

const deletePostAction = createAsyncThunk(
  "/user/delete_post",
  async (PostID: number, { rejectWithValue }) => {
    try {
      const res = await global_axios.delete(`/user/delete_post:${PostID}`);
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
export { postUserAction, getPostAction, deletePostAction };
