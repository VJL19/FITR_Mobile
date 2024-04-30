import Ionicons from "react-native-vector-icons/Ionicons";
interface IDrawerIconProp {
  color: string;
  size: number;
  focused: boolean;
  name: string;
}

const drawerIcon = ({ color, size, focused, name }: IDrawerIconProp) => {
  if (focused) {
    return <Ionicons name={name} size={size} color={color} />;
  }
  return <Ionicons name={`${name}-outline`} size={size} color={color} />;
};

export default drawerIcon;
