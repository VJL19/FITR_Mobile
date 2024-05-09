import { createAsyncThunk } from "@reduxjs/toolkit";
import IUser, { RegisterPayload } from "../utils/types/user.types";
import global_axios from "../global/axios";
import { AxiosError } from "axios";

export type KnownError = {
  message: string;
  description: string;
  code: number | undefined;
};

const registerUser = createAsyncThunk(
  "user/register",
  async (registerPayload: RegisterPayload, { rejectWithValue }) => {
    const newObj = {
      ...registerPayload,
    };

    const profile_ext = newObj?.ProfilePic?.split(".");
    const formData = new FormData();
    formData.append("LastName", newObj.LastName);
    formData.append("FirstName", newObj.FirstName);
    formData.append("MiddleName", newObj.MiddleName);
    formData.append("Age", newObj.Age);
    formData.append("ContactNumber", newObj.ContactNumber);
    formData.append("Email", newObj.Email);
    formData.append("Height", newObj.Height);
    formData.append("Weight", newObj.Weight);
    formData.append("Username", newObj.Username);
    formData.append("Password", newObj.Password);
    formData.append("ConfirmPassword", newObj.ConfirmPassword);
    formData.append("Gender", newObj.Gender);
    formData.append("ProfilePic", {
      uri: newObj.ProfilePic,
      type: "image/jpeg",
      name: new Date() + `_${profile_ext?.[profile_ext?.length - 1]}`,
    });
    try {
      const res = await global_axios.post("/user/register_account", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;

      return data;
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export default registerUser;
