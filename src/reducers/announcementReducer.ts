import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import { IAnnouncements } from "utils/types/announcement.types";
import * as SecureStore from "expo-secure-store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IAnnouncementState {
  error: string;
  status: number;
  message: string;
  result: IAnnouncements[];
}

interface IAnnouncementSliceState {
  announcementData: IAnnouncements;
}

const initialState: IAnnouncementSliceState = {
  announcementData: {
    AnnouncementID: 0,
    AnnouncementImage: "",
    AnnouncementTitle: "",
    AnnouncementDate: "",
    AnnouncementDescription: "",
  },
};

const config = loadConfig();

export const announcementApi = createApi({
  reducerPath: "/admin/announcement",
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: async (headers: Headers, { getState }) => {
      // const token = (getState() as RootState).authReducer.accessToken;
      const token = await SecureStore.getItemAsync("accessToken");
      // console.log("state", getState());
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["announcement"],
  endpoints: (builder) => ({
    getAllAnnoucements: builder.query<IAnnouncementState, void>({
      query: () => "/user/announcement/all_announcements",
      providesTags: ["announcement"],
    }),
    getAllTodaysAnnouncements: builder.query<IAnnouncementState, void>({
      query: () => "/user/announcement/all_todays_announcements",
      providesTags: ["announcement"],
    }),
  }),
});

export const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setAnnouncementData: (state, action: PayloadAction<IAnnouncements>) => {
      state.announcementData = action.payload;
    },
  },
});

export const { setAnnouncementData } = announcementSlice.actions;

export const { useGetAllAnnoucementsQuery, useGetAllTodaysAnnouncementsQuery } =
  announcementApi;
export default announcementSlice.reducer;
