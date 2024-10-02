import { TouchableOpacity, View } from "react-native";
import { DoneButtonProps } from "react-native-onboarding-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";

const backgroundColor = (isLight) => (isLight ? "#fff" : "#ff2e00");
const color = (isLight) => backgroundColor(!isLight);

const CustomDoneComponent = (props: DoneButtonProps) => {
  const { isLight } = props;
  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          padding: 15,
          backgroundColor: backgroundColor(isLight),
          borderRadius: 50,
        }}
      >
        <Ionicons name={"checkmark"} size={30} color={color(isLight)} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomDoneComponent;
