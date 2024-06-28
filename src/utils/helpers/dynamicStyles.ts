import { ColorValue } from "react-native";
import { INTENSITY } from "utils/enums/Workout";

const dynamicColor = (intensity: string): ColorValue => {
  const applyColor =
    intensity.toUpperCase() === INTENSITY.BEGINNER
      ? "green"
      : intensity.toUpperCase() === INTENSITY.INTERMEDIATE
      ? "orange"
      : "red";

  return applyColor;
};

export default dynamicColor;
