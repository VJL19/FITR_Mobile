import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../utils/types/navigators/RootStackNavigators";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default RootStack;
