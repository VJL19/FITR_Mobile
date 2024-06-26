import { IExercises } from "./exercises.types";
import { IWorkouts } from "./workouts.types";

export interface IWorkOutFavorites extends IWorkouts {
  UserID: number;
  WorkOutFavoriteID: number;
  isWorkOutFavorite: boolean;
}
export interface IExerciseFavorites extends IExercises {
  UserID: number;
  ExerciseFavoriteID: number;
  isExerciseFavorite: boolean;
}
