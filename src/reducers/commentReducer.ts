import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  commentPostAction,
  getAllCommentsAction,
  removeUserCommentAction,
} from "../actions/commentAction";
import { IComments } from "../utils/types/newsfeed.types";

interface ICommentState {
  message: string;
  status: number;
  error: string;
  isLoading: boolean;

  comments: IComments[];
  commentData: IComments;
  viewCommentData: IComments;
}

const initialState: ICommentState = {
  message: "",
  error: "",
  status: 0,
  isLoading: false,
  comments: [],
  commentData: {
    NewsfeedID: 0,
    UserID: 0,
    CommentID: 0,
    CommentText: "",
    ProfilePic: "",
    Username: "",
    CommentDate: "",
    PostTitle: "",
    PostAuthor: "",
    PostDate: "",
    PostDescription: "",
    PostID: 0,
    PostImage: "",
  },
  viewCommentData: {
    UserID: 0,
    NewsfeedID: 0,
    CommentID: 0,
    CommentText: "",
    PostImage: "",
    PostTitle: "",
    PostDescription: "",
    PostDate: "",
    PostAuthor: "",
    Username: "",
    PostID: 0,
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentData: (state, action: PayloadAction<IComments>) => {
      state.commentData = action.payload;
    },
    setViewCommentData: (state, action: PayloadAction<IComments>) => {
      state.viewCommentData = action.payload;
    },
  },
  extraReducers: (builder) => {
    //for getting all the comment in a post
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
    //for removing the comment in a post.
    builder.addCase(removeUserCommentAction.fulfilled, (state, action) => {
      state.message = action;
      state.status = action.payload?.status;
      state.isLoading = false;
    });
    builder.addCase(removeUserCommentAction.pending, (state, action) => {
      state.message = { details: "Loading removing comment in a posts..." };
      state.status = 202;
      state.isLoading = true;
    });
    builder.addCase(removeUserCommentAction.rejected, (state, action) => {
      state.message = action.payload?.message;
      state.error = action.payload?.error;
      state.isLoading = false;
      state.status = 400;
    });
  },
});
export const { setCommentData, setViewCommentData } = commentSlice.actions;
export default commentSlice.reducer;
