import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const ViewDetailedSubscriptionHistory = () => {
  const {
    SubscriptionBy,
    Email,
    SubscriptionAmount,
    SubscriptionStatus,
    SubscriptionMethod,
    SubscriptionEntryDate,
    SubscriptionType,
    ContactNumber,
  } = useSelector(
    (state: RootState) => state.subscription.viewSubscriptionPayload
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detailed Subscription History</Text>
      <View style={styles.box}>
        <Text style={styles.subTitle}>Billing Details</Text>
        <Text style={styles.label}>Paid Date: {SubscriptionEntryDate}</Text>
        <Text style={styles.label}>Paid By: {SubscriptionBy}</Text>
        <Text style={styles.label}>Email: {Email}</Text>
        <Text style={styles.label}>Contact Number: {ContactNumber}</Text>
        <Text style={styles.subTitle}>Payment Details:</Text>
        <Text style={styles.label}>Amount - {SubscriptionAmount} PHP</Text>
        <Text style={styles.label}>
          Status - {SubscriptionStatus?.toUpperCase()}
        </Text>
        <Text style={styles.label}>
          Method - {SubscriptionMethod?.toUpperCase()}
        </Text>
        <Text style={styles.label}>
          Type - {SubscriptionType?.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

export default ViewDetailedSubscriptionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "left",
    fontFamily: "Inter-Bold",
  },
  box: {
    padding: 25,
    backgroundColor: "rgba(255,45,0, .25)",
    width: "90%",
    marginTop: 15,
  },
  subTitle: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
  },
  label: {
    fontSize: 18,
  },
});
