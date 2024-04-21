import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamLists } from "../utils/types/navigators/AuthStackNavigators";

const AuthStack = createNativeStackNavigator<AuthStackParamLists>();

export default AuthStack;
