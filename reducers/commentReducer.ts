import { createSlice } from "@reduxjs/toolkit";
import { getAllCommentsAction } from "../actions/commentAction";

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
      state.message = action;
      state.status = action.payload?.status;
      state.comments = action.payload?.results;
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
  },
});

export default commentSlice.reducer;
