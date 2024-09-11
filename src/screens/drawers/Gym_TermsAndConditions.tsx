import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const Gym_TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Privacy:</Text>
      <ScrollView>
        <Text style={styles.description}>
          Acknowledging the data privacy act, the developers are dedicated to
          respecting and securing your data. We abide by and respect the 2012
          Philippine Data Privacy Act. To foster innovation and development, the
          State's policy is to maintain the fundamental human rights of
          communication and privacy while enabling the free exchange of
          information. The State is aware of the contribution that information
          and communications technology perform to a country's development and
          the inherent responsibility it has for ensuring the security and
          privacy of personal data in information and communications systems
          used by both the public and private sectors of the government. Please
          be advised that all personal information you supply by filling out
          this form will be used strictly to further the objectives of the
          developers in compliance with Republic Act (RA) 10173, generally known
          as the Data Privacy Act of 2012.
        </Text>
      </ScrollView>
      <Text style={styles.title}>For the Gym:</Text>
      <ScrollView>
        <Text style={styles.description}>
          The management is not liable to any personal or bodily injury, for not
          following safety rules in connection with gym activities.
        </Text>
      </ScrollView>
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
