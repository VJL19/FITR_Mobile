import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

interface IButtonProp {
  textStyle: StyleProp<TextStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  textValue: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default IButtonProp;
