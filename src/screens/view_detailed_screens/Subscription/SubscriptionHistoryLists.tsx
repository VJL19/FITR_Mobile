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

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>PHP {SubscriptionAmount}</Text>
        <Text>{SubscriptionStatus?.toUpperCase()}</Text>
        <Text>DATE {SubscriptionEntryDate.split(",")[0]}</Text>
        <Text>FOR {getSubscriptionType} Subscription</Text>
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
    backgroundColor: "rgba(255,45,0, .2)",
    width: "90%",
    marginTop: 15,
  },
});
