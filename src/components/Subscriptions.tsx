import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ISubscriptions } from "utils/types/subscriptions.types";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const Subscriptions = ({
  SubscriptionAmount,
  SubscriptionUploadedImage,
  SubscriptionBy,
  SubscriptionType,
  SubscriptionMethod,
  SubscriptionStatus,
  Email,
  ContactNumber,
}: ISubscriptions) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePress = () => {
    navigation.navigate("DetailedScreens", { screen: "View Payments" });
  };

  const handleNavigate = () => {
    navigation.navigate("DetailedScreens", {
      screen: "View Image",
      params: {
        imageUrl: SubscriptionUploadedImage,
      },
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text>View Subscription History</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text style={styles.title}>Billing Details</Text>
        <Text style={styles.label}>Paid By: {SubscriptionBy}</Text>
        <Text style={styles.label}>Email: {Email}</Text>
        <Text style={styles.label}>Contact Number: {ContactNumber}</Text>
        <Text style={styles.title}>Payment Details:</Text>
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

export default Subscriptions;

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
  title: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
  },
  label: {
    fontSize: 18,
  },
});
