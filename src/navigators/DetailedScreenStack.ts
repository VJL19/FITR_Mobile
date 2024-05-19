import { DetailedRootStackNavigatorsParamList } from "../utils/types/detailed_screens/DetailedRootStackNavigators";
import { createStackNavigator } from "@react-navigation/stack";

const DetailedScreenStacks =
  createStackNavigator<DetailedRootStackNavigatorsParamList>();

export default DetailedScreenStacks;
