import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../utils/types/navigators/RootStackNavigators";
import IButtonProp from "../utils/types/components_types/Button";

const CustomButton = ({
  textStyle,
  buttonStyle,
  textValue,
  screenToNavigate,
  screenName,
}: IButtonProp) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(screenToNavigate, {
          screen: screenName,
        })
      }
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={textStyle}>{textValue}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
