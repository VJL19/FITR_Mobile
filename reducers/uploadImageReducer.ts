import { createSlice } from "@reduxjs/toolkit";
import uploadImageAction from "../actions/uploadImageAction";

interface IUploadState {
  message: {};
  isLoading: boolean;
  error: string;
  status: number;
  public_id: string;
}

const initialState: IUploadState = {
  message: {},
  isLoading: false,
  error: "",
  status: 0,
  public_id: "",
};

const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImageAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload?.secure_url;
      state.status = 200;
      state.public_id = action.payload?.public_id;
    });
    builder.addCase(uploadImageAction.pending, (state, action) => {
      state.isLoading = true;
      state.message = { details: "Loading" };
      state.status = 202;
    });
    builder.addCase(uploadImageAction.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action;
      state.error = action.payload?.error;
      state.status = 400;
    });
  },
});

export default uploadImageSlice.reducer;
