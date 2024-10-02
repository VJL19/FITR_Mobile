import { View } from "react-native";
import { DotProps } from "react-native-onboarding-swiper";
const backgroundColor = (isLight) => (isLight ? "#fff" : "#ff2e00");
const color = (isLight) => backgroundColor(!isLight);
const CustomDotComponent = (props: DotProps) => {
  let backgroundColor;
  const { isLight, selected } = props;
  if (isLight) {
    backgroundColor = selected ? "#fff" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 10,
        height: 10,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

export default CustomDotComponent;
