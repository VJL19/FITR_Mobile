import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useDeleteUserProgramMutation } from "reducers/programReducer";
import DisplayAlert from "components/CustomAlert";
import { useNavigation } from "@react-navigation/native";
import DialogBox from "components/DialogBox";
import RenderHTML from "react-native-render-html";
const ViewSuggestedProgram = () => {
  const {
    SuggestedProgramID,
    SuggestedProgramTitle,
    SuggestedProgramDescription,
  } = useSelector((state: RootState) => state.program.suggestedProgramData);

  const html = `
    ${SuggestedProgramDescription}
  `;
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{SuggestedProgramTitle}</Text>
      <View style={{ flex: 1 }}>
        <RenderHTML contentWidth={width} source={{ html }} />
      </View>
    </View>
  );
};

export default ViewSuggestedProgram;

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  editor: {
    flexGrow: 1,
    padding: 0,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
  },
});
