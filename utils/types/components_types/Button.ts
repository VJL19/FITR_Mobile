import { NavigationProp } from "@react-navigation/native";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { AuthStackNavigationProp } from "../navigators/AuthStackNavigators";

interface IButtonProp {
  textStyle: StyleProp<TextStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  textValue: string;
  screenToNavigate: any;
  screenName?: any;
}

export default IButtonProp;
