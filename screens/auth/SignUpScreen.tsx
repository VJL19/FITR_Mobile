import { View, Text, Alert, TextInput, Button } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AuthStackNavigationProp,
  AuthStackScreenProp,
} from "../../utils/types/navigators/AuthStackNavigators";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = ({ navigation }: AuthStackScreenProp) => {
  const navigate = useNavigation<AuthStackNavigationProp>();
  const [text, setText] = React.useState("");
  const hasUnsavedChanges = Boolean(text);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // if (!hasUnsavedChanges) {
        //   // If we don't have unsaved changes, then we don't need to do anything
        //   return;
        // }
        // // Prevent default behavior of leaving the screen
        // e.preventDefault();
        // // Prompt the user before leaving the screen
        // Alert.alert(
        //   "Discard changes?",
        //   "You have unsaved changes. Are you sure to discard them and leave the screen?",
        //   [
        //     { text: "Don't leave", style: "cancel", onPress: () => {} },
        //     {
        //       text: "Discard",
        //       style: "destructive",
        //       // If the user confirmed, then we dispatch the action we blocked earlier
        //       // This will continue the action that had triggered the removal of the screen
        //       onPress: () => navigation.dispatch(e.data.action),
        //     },
        //   ]
        // );
      }),
    [navigation, hasUnsavedChanges]
  );
  return (
    <SafeAreaView>
      <Text>SignUpScreen</Text>
      <TextInput
        value={text}
        placeholder="Type something…"
        onChangeText={setText}
      />
      <Button
        title="Register"
        color={"#131313"}
        onPress={() => navigate.navigate("Sign Up")}
      />
    </SafeAreaView>
  );
};

export default SignUpScreen;
