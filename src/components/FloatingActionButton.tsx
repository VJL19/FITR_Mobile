import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FloatingActionButton = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.buttonStyle}>
      <Icon name="plus" size={40} color="#f5f5f5" />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "21%",
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 75,
    backgroundColor: "#ff213f",
    borderRadius: 100,
    elevation: 20,
  },
});
