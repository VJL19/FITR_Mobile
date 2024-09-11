import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ISubscriptions } from "utils/types/subscriptions.types";
import SubscriptionTypeEnum from "utils/enums/Subscription";

const SubscriptionHistoryLists = ({
  SubscriptionAmount,
  SubscriptionEntryDate,
  SubscriptionStatus,
}: ISubscriptions) => {
  const getSubscriptionType =
    SubscriptionAmount === 90
      ? SubscriptionTypeEnum.Session
      : SubscriptionTypeEnum.Monthly;

  const formatDate = SubscriptionEntryDate.split(", ").join("");
  console.log(formatDate);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>PHP {SubscriptionAmount}</Text>
        <Text style={styles.text}>{SubscriptionStatus?.toUpperCase()}</Text>
        <Text style={styles.text}>{formatDate}</Text>
        <Text style={styles.text}>FOR {getSubscriptionType} Subscription</Text>
        {SubscriptionStatus === "rejected" && (
          <Text style={{ fontSize: 18, color: "#d9534f", fontWeight: "700" }}>
            Note: Please re-upload the screenshot proof of payment ASAP.
          </Text>
        )}
      </View>
    </View>
  );
};

export default SubscriptionHistoryLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    width: "90%",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E12900",
  },
  text: {
    color: "#202020",
  },
});
