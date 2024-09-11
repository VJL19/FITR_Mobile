export interface IGymEquipmentTutorial {
  GymEquipmentID: number;
  GymEquipmentName: string;
  GymEquipmentTutorialID: number;
  GymEquipmentTutorialTitle: string;
  GymEquipmentTutorialThumbnail: string;
  GymEquipmentTutorialLink: string;
}
export interface IGymEquipment {
  GymEquipmentID: number;
  GymEquipmentImage: string;
  GymEquipmentName: string;
  GymEquipmentDescription: string;
  GymEquipmentIntensity: string;
  GymEquipmentTargetMuscle: string;
  GymEquipmentCategory: string;
  GymEquipmentInstructions: string;
  GymEquipmentTutorialVideos?: IGymEquipmentTutorial[];
}
