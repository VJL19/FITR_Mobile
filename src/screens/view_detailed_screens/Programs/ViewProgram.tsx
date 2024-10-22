import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useDeleteUserProgramMutation } from "reducers/programReducer";
import DisplayAlert from "components/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import DialogBox from "components/DialogBox";
import WebView from "react-native-webview";
import RenderHTML from "react-native-render-html";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";
import HTTP_ERROR from "utils/enums/ERROR_CODES";

const ViewProgram = () => {
  const { ProgramID, ProgramTitle, ProgramDescription } = useSelector(
    (state: RootState) => state.program.programData
  );

  const [finishProgram, { data, error: programErr, status: programStat }] =
    useDeleteUserProgramMutation();

  const { width } = useWindowDimensions();
  const html = `${ProgramDescription}`;
  const navigation = useNavigation();

  const { isConnected } = useIsNetworkConnected();

  useEffect(() => {
    if (programErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (programErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      programStat === "rejected" &&
      programErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", programErr?.data?.error?.sqlMessage);
    }
    if (programStat === "fulfilled") {
      DisplayAlert("Success message", "Program finish successfully!");
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigation.goBack();
      };
      delayRedirect();
    }
    if (programErr?.status === HTTP_ERROR.BAD_REQUEST) {
      DisplayAlert("Error message", programErr?.data?.message);
    }
  }, [programStat]);

  const handleFinish = async () => {
    DialogBox({
      dialogTitle: "Finish program?",
      dialogDescription:
        "This action cannot be undone and will remove this program from your lists.",
      params: ProgramID,
      async handlePress(args) {
        finishProgram(args);
      },
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{ProgramTitle}</Text>

        <RenderHTML contentWidth={width} source={{ html }} />
      </View>
      <Button
        color="#ff2e00"
        title="Finish this program"
        onPress={handleFinish}
      />
    </View>
  );
};

export default ViewProgram;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    padding: 25,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
