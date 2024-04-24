import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import IUser from "../utils/types/user.types";
import global_axios from "../global/axios";

interface IAuthState {
  user: IUser[];
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string;
  message: string;
}

const initialState: IAuthState = {
  //   user: {
  //     UserID: 0,
  //     LastName: "",
  //     FirstName: "",
  //     MiddleName: "",
  //     Age: 0,
  //     ContactNumber: "",
  //     Email: "",
  //     Height: 0,
  //     Weight: 0,
  //     Username: "",
  //     Password: "",
  //     ConfirmPassword: "",
  //     ProfilePic: "",
  //     Gender: "",
  //   },
  user: [],
  isAuthenticated: false,
  isLoading: false,
  token: "",
  message: "",
};

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await global_axios.fetch("/");
  } catch (err) {}
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
