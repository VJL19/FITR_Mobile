import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { KnownError } from "./registerAction";

const uploadImageAction = createAsyncThunk(
  "/user/upload_image",
  async (arg: { file: string; base64: string }, { rejectWithValue }) => {
    try {
      const preset_key = "aa25kjiu";
      const cloud_name = "dh5kbmrq3";

      const uriArr = arg.file.split(".");
      const fileType = uriArr[uriArr.length - 1];
      const file = `data:${fileType};base64,${arg.base64}`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "aa25kjiu");
      formData.append("cloud_name", "dh5kbmrq3");
      formData.append("folder", "profile_pics");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
export default uploadImageAction;
