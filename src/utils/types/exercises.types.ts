export interface IExerciseTutorials {
  ExerciseID: number;
  ExerciseName: string;
  ExerciseTutorialID: number;
  ExerciseTutorialTitle: string;
  ExerciseTutorialThumbnail: string;
  ExerciseTutorialLink: string;
}

export interface IExercises {
  ExerciseID: number;
  ExerciseImage: string;
  ExerciseName: string;
  ExerciseSets: string;
  ExerciseReps: string;
  ExerciseExplanation: string;
  ExerciseIntensity: string;
  ExerciseTargetMuscle: string;
  ExerciseCategory: string;
  ExerciseTutorialVideos?: IExerciseTutorials[];
}
