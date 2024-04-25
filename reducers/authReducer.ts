import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import IUser from "../utils/types/user.types";
import global_axios from "../global/axios";
import { AxiosError } from "axios";

interface IProductState {
  message: string;
}

interface IAuthState {
  user: IUser[];
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string;
  message: string | undefined;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
  message: "",
  token: "",
  user: [],
};

// const initialState: IAuthState = {
//   //   user: {
//   //     UserID: 0,
//   //     LastName: "",
//   //     FirstName: "",
//   //     MiddleName: "",
//   //     Age: 0,
//   //     ContactNumber: "",
//   //     Email: "",
//   //     Height: 0,
//   //     Weight: 0,
//   //     Username: "",
//   //     Password: "",
//   //     ConfirmPassword: "",
//   //     ProfilePic: "",
//   //     Gender: "",
//   //   },
//   user: [],
//   isAuthenticated: false,
//   isLoading: false,
//   token: "",
//   message: "",
// };

export type KnownError = {
  message: string;
  description: string;
  code: number | undefined;
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await global_axios.get("/user/sample_health");
      const data: IProductState = res.data;
      return data;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.message = action?.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.message = "rejected";
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.message = "pending!";
    });
  },
});

export default authSlice.reducer;
