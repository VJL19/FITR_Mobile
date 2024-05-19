import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../utils/types/navigators/BottomTabNavigators";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default BottomTab;
