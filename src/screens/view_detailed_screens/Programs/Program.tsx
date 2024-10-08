import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import IProgram from "utils/types/program_planner.types";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setProgramData } from "reducers/programReducer";

const Program = ({
  ProgramTitle,
  ProgramEntryDate,
  ProgramID,
  ProgramDescription,
}: IProgram) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const dispatch: AppDispatch = useDispatch();
  const handlePress = () => {
    const arg = {
      ProgramID: ProgramID,
      ProgramTitle: ProgramTitle,
      ProgramDescription: ProgramDescription,
      ProgramEntryDate: ProgramEntryDate,
    };
    dispatch(setProgramData(arg));
    navigation.navigate("DetailedScreens", { screen: "View Program" });
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View style={styles.box}>
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {ProgramTitle}
          </Text>

          <Text style={styles.date}>
            {new Date(ProgramEntryDate?.substring(0, 10)).toDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Program;

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 170,
    width: 300,
    padding: 15,
    marginTop: 15,
    backgroundColor: "#f5f5f5",
    borderColor: "#E12900",
    borderWidth: 1.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "Inter-Bold",
    color: "#202020",
  },
  date: {
    fontSize: 14,
    color: "#202020",
  },
});
