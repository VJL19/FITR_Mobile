import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerStackParamList } from "../utils/types/navigators/DrawerStackNavigators";

const DrawerStack = createDrawerNavigator<DrawerStackParamList>();

export default DrawerStack;
