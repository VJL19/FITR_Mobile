import { createSlice } from "@reduxjs/toolkit";
import attendanceUser from "../actions/attendanceAction";

interface IAttendanceState {
  error: string;
  status: number;
  message: string;
}

const initialState: IAttendanceState = {
  status: 0,
  error: "",
  message: "",
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(attendanceUser.fulfilled, (state, action) => {
      state.error = action.payload?.error;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    });
    builder.addCase(attendanceUser.pending, (state, action) => {
      state.status = 202;
      state.message = { details: "Loading attendance..." };
    });
    builder.addCase(attendanceUser.rejected, (state, action) => {
      state.status = action.payload?.status;
      state.error = action.payload?.error;
      state.message = action.payload;
    });
  },
});

export default attendanceSlice.reducer;
