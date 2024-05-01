import { Classification } from "../enums/Classification";

const getClassification = (res: number) => {
  let BMIclassification = Classification.NORMAL;

  if (res <= 18.4) {
    BMIclassification = Classification.UNDERWEIGHT;
  } else if (res >= 18.5 && res <= 24.9) {
    BMIclassification = Classification.NORMAL;
  } else if (res >= 25.0 && res <= 39.9) {
    BMIclassification = Classification.OVERWEIGHT;
  } else if (res >= 40.0) {
    BMIclassification = Classification.OBESE;
  }
  return BMIclassification;
};
export default getClassification;
