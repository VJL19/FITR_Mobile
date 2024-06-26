import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import { IGymEquipment } from "utils/types/gym_equipment.types";
import { IExercises } from "utils/types/exercises.types";
import { IWorkouts } from "utils/types/workouts.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

interface ITutorialState {
  error: string;
  message: string;
  status: number;
  gym_results: IGymEquipment[];
  exercise_results: IExercises[];
  workout_results: IWorkouts[];
}

interface ITutorialSliceState {
  gym_data: IGymEquipment;
  exercise_data: IExercises;
  workout_data: IWorkouts;
}

const initialState: ITutorialSliceState = {
  gym_data: {
    GymEquipmentID: 0,
    GymEquipmentImage: "",
    GymEquipmentName: "",
    GymEquipmentDescription: "",
    GymEquipmentIntensity: "",
    GymEquipmentTargetMuscle: "",
    GymEquipmentCategory: "",
    GymEquipmentTutorialVideos: [],
  },
  exercise_data: {
    ExerciseID: 0,
    ExerciseImage: "",
    ExerciseName: "",
    ExerciseSets: "",
    ExerciseReps: "",
    ExerciseExplanation: "",
    ExerciseIntensity: "",
    ExerciseTargetMuscle: "",
    ExerciseCategory: "",
    ExerciseTutorialVideos: [],
  },
  workout_data: {
    WorkOutID: 0,
    WorkOutImage: "",
    WorkOutName: "",
    WorkOutSets: "",
    WorkOutReps: "",
    WorkOutExplanation: "",
    WorkOutIntensity: "",
    WorkOutTargetMuscle: "",
    WorkOutCategory: "",
    WorkOutTutorialVideos: [],
  },
};

const config = loadConfig();
export const tutorialApi = createApi({
  reducerPath: "/user/tutorial",
  tagTypes: ["tutorial"],
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
  endpoints: (builder) => ({
    getGymEquipmentByTargetMuscle: builder.query<
      ITutorialState,
      string | undefined
    >({
      query: (GymEquipmentTargetMuscle) =>
        `/user/gym_equipments/target_muscle:${GymEquipmentTargetMuscle}`,
      providesTags: ["tutorial"],
    }),
    getGymEquipmentByIntensity: builder.query<
      ITutorialState,
      string | undefined
    >({
      query: (GymEquipmentIntensity) =>
        `/user/gym_equipments/intensity:${GymEquipmentIntensity}`,
      providesTags: ["tutorial"],
    }),
    getGymEquipmentByCategory: builder.query<
      ITutorialState,
      string | undefined
    >({
      query: (GymEquipmentCategory) =>
        `/user/gym_equipments/category:${GymEquipmentCategory}`,
      providesTags: ["tutorial"],
    }),
    getAllGymEquipments: builder.query<ITutorialState, void>({
      query: () => "/user/gym_equipments/all_equipments",
      providesTags: ["tutorial"],
    }),
    getExerciseByTargetMuscle: builder.query<
      ITutorialState,
      string | undefined
    >({
      query: (ExerciseTargetMuscle) =>
        `/user/exercises/target_muscle:${ExerciseTargetMuscle}`,
      providesTags: ["tutorial"],
    }),
    getExerciseByIntensity: builder.query<ITutorialState, string | undefined>({
      query: (ExerciseIntensity) =>
        `/user/exercises/intensity:${ExerciseIntensity}`,
      providesTags: ["tutorial"],
    }),
    getExerciseByCategory: builder.query<ITutorialState, string | undefined>({
      query: (ExerciseCategory) =>
        `/user/exercises/category:${ExerciseCategory}`,
      providesTags: ["tutorial"],
    }),
    getAllExercises: builder.query<ITutorialState, void>({
      query: () => "/user/exercises/all_exercises",
      providesTags: ["tutorial"],
    }),
    getWorkOutByTargetMuscle: builder.query<ITutorialState, string | undefined>(
      {
        query: (WorkOutTargetMuscle) =>
          `/user/workouts/target_muscle:${WorkOutTargetMuscle}`,
        providesTags: ["tutorial"],
      }
    ),
    getWorkOutByIntensity: builder.query<ITutorialState, string | undefined>({
      query: (WorkOutIntensity) =>
        `/user/workouts/intensity:${WorkOutIntensity}`,
      providesTags: ["tutorial"],
    }),
    getWorkOutByCategory: builder.query<ITutorialState, string | undefined>({
      query: (WorkOutCategory) => `/user/workouts/category:${WorkOutCategory}`,
      providesTags: ["tutorial"],
    }),
    getAllWorkouts: builder.query<ITutorialState, void>({
      query: () => `/user/workouts/all_workouts`,
      providesTags: ["tutorial"],
    }),
  }),
});

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState: initialState,
  reducers: {
    setGymEquipmentData: (state, action: PayloadAction<IGymEquipment>) => {
      state.gym_data = action.payload;
    },
    setExerciseData: (state, action: PayloadAction<IExercises>) => {
      state.exercise_data = action.payload;
    },
    setWorkoutData: (state, action: PayloadAction<IWorkouts>) => {
      state.workout_data = action.payload;
    },
  },
});

export const { setExerciseData, setGymEquipmentData, setWorkoutData } =
  tutorialSlice.actions;

export const {
  useGetAllGymEquipmentsQuery,
  useGetGymEquipmentByCategoryQuery,
  useGetGymEquipmentByIntensityQuery,
  useGetGymEquipmentByTargetMuscleQuery,
  useGetAllExercisesQuery,
  useGetExerciseByCategoryQuery,
  useGetExerciseByIntensityQuery,
  useGetExerciseByTargetMuscleQuery,
  useGetAllWorkoutsQuery,
  useGetWorkOutByCategoryQuery,
  useGetWorkOutByIntensityQuery,
  useGetWorkOutByTargetMuscleQuery,
} = tutorialApi;
export default tutorialSlice.reducer;
