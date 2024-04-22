import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardStackParamList } from "../utils/types/navigators/DashboardStackNavigator";

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

export default DashboardStack;
