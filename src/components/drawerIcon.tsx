import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
interface IDrawerIconProp {
  color: string;
  size: number;
  focused: boolean;
  name: string;
}

const drawerIcon = ({ color, size, focused, name }: IDrawerIconProp) => {
  if (focused) {
    return <MaterialIcons name={name} size={size} color={color} />;
  }
  return <MaterialIcons name={`${name}`} size={size} color={color} />;
};

export default drawerIcon;
