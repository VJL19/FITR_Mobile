import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRegisterState } from "../utils/types/user.types";
import registerUser from "../actions/registerAction";

const initialState: IRegisterState = {
  status: 0,
  details: {},
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //for register api call.
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.details = action?.payload?.details;
      state.status = 200;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.details = { message: "pending" };
      state.status = 202;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.details = action?.payload;
      state.status = action?.payload?.status;
    });
    //for log out api call.
  },
});
export default registerSlice.reducer;
