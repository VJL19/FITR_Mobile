import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useDeleteUserProgramMutation } from "reducers/programReducer";
import DisplayAlert from "components/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import DialogBox from "components/DialogBox";

const ViewProgram = () => {
  const { ProgramID, ProgramTitle, ProgramDescription } = useSelector(
    (state: RootState) => state.program.programData
  );

  const [finishProgram, { data, error }] = useDeleteUserProgramMutation();

  const navigation = useNavigation();
  const handleFinish = async () => {
    DialogBox({
      dialogTitle: "Confirmation",
      dialogDescription: "Are you sure you want to finish this program?",
      params: ProgramID,
      async handlePress(args) {
        finishProgram(args);
        DisplayAlert("Success message", "Program finish successfully!");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigation.goBack();
      },
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{ProgramTitle}</Text>
        <Text>{ProgramDescription}</Text>
      </View>
      <Button title="Finish this program" onPress={handleFinish} />
    </View>
  );
};

export default ViewProgram;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
