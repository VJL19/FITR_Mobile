import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Gym_TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Note:</Text>
      <View>
        <Text style={styles.description}>
          The management is not liable to any personal or bodily injury, for not
          following safety rules in connection with gym activities.
        </Text>
      </View>
    </View>
  );
};

export default Gym_TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    lineHeight: 25,
    textAlign: "justify",
  },
});
