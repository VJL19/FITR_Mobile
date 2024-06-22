import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import DisplayAlert from "./CustomAlert";

const DialogBox = ({
  dialogTitle,
  dialogDescription,
  params,
  handlePress,
}: {
  dialogTitle: string;
  dialogDescription: string;
  params?: any;
  handlePress: (args: any) => Promise<void>;
}) => {
  return Alert.alert(dialogTitle, dialogDescription, [
    { text: "Discard", style: "cancel", onPress: () => {} },
    {
      text: "Confirm",
      style: "destructive",
      onPress: async () => {
        handlePress(params);
      },
    },
  ]);
};

export default DialogBox;

const styles = StyleSheet.create({});
