import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import loadConfig from "global/config";
import { IGymEquipment } from "utils/types/gym_equipment.types";
import { IExercises } from "utils/types/exercises.types";
import { IWorkouts } from "utils/types/workouts.types";

interface ITutorialState {
  error: string;
  message: string;
  status: number;
  result: IGymEquipment[] | IExercises[] | IWorkouts[];
}

const config = loadConfig();
export const tutorialApi = createApi({
  reducerPath: "/user/tutorial",
  tagTypes: ["tutorial"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.BASE_URL,
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
