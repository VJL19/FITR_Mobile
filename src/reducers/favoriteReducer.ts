import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import {
  IExerciseFavorites,
  IWorkOutFavorites,
} from "utils/types/favorites.types";
import * as SecureStore from "expo-secure-store";

const config = loadConfig();

interface IFavoriteState {
  error: string;
  message: string;
  status: number;
  result: IExerciseFavorites[];
}
interface IFavoriteWorkOutState {
  error: string;
  message: string;
  status: number;
  result: IWorkOutFavorites[];
}

export const favoriteExerciseApi = createApi({
  reducerPath: "/user/favorites/exercise",
  tagTypes: ["favorites_exercise"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    addExerciseFavorites: builder.mutation<
      IFavoriteState,
      { ExerciseID: number; UserID: number | undefined }
    >({
      query: (arg) => ({
        url: "/user/favorites/exercise/add_favorite",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["favorites_exercise"],
    }),
    checkExerciseFavorite: builder.mutation<
      IFavoriteState,
      { ExerciseID: number; UserID: number | undefined }
    >({
      query: (arg) => ({
        url: "/user/favorites/exercise/check_favorite",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["favorites_exercise"],
    }),
    removeExerciseFavorite: builder.mutation<
      IFavoriteState,
      { ExerciseID: number; UserID: number | undefined }
    >({
      query: (arg) => ({
        url: "/user/favorites/exercise/remove_favorite",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["favorites_exercise"],
    }),
    getExercisesFavorites: builder.query<IFavoriteState, number | undefined>({
      query: (UserID) => `/user/favorites/exercises/:${UserID}`,
      providesTags: ["favorites_exercise"],
    }),
  }),
});
export const favoriteWorkoutApi = createApi({
  reducerPath: "/user/favorites/workout",
  tagTypes: ["favorites_workout"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
  }),
  endpoints: (builder) => ({
    addWorkoutFavorites: builder.mutation<
      IFavoriteWorkOutState,
      { WorkOutID: number; UserID: number | undefined }
    >({
      query: (arg) => ({
        url: "/user/favorites/workout/add_favorite",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["favorites_workout"],
    }),
    checkWorkoutFavorite: builder.mutation<
      IFavoriteWorkOutState,
      { WorkOutID: number; UserID: number | undefined }
    >({
      query: (arg) => ({
        url: "/user/favorites/workout/check_favorite",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["favorites_workout"],
    }),
    removeWorkoutFavorite: builder.mutation<
      IFavoriteWorkOutState,
      { WorkOutID: number; UserID: number | undefined }
    >({
      query: (arg) => ({
        url: "/user/favorites/workout/remove_favorite",
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["favorites_workout"],
    }),
    getWorkoutsFavorites: builder.query<
      IFavoriteWorkOutState,
      number | undefined
    >({
      query: (UserID) => `/user/favorites/workouts/:${UserID}`,
      providesTags: ["favorites_workout"],
    }),
  }),
});

export const {
  useAddExerciseFavoritesMutation,
  useCheckExerciseFavoriteMutation,
  useRemoveExerciseFavoriteMutation,
  useGetExercisesFavoritesQuery,
} = favoriteExerciseApi;

export const {
  useAddWorkoutFavoritesMutation,
  useCheckWorkoutFavoriteMutation,
  useRemoveWorkoutFavoriteMutation,
  useGetWorkoutsFavoritesQuery,
} = favoriteWorkoutApi;
