import { Alert } from "react-native";

const DisplayAlert = (title: string, message: string | unknown) => {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: () => {},
      style: "cancel",
    },
    { text: "OK", onPress: () => {} },
  ]);
};

export default DisplayAlert;
