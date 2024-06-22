import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ISubscriptions } from "utils/types/subscriptions.types";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const Subscriptions = ({
  SubscriptionAmount,
  SubscriptionUploadedImage,
  SubscriptionStatus,
}: ISubscriptions) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const handlePress = () => {
    navigation.navigate("DetailedScreens", { screen: "View Payments" });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text>View Subscription History</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.box}>
        <Image
          source={{ uri: SubscriptionUploadedImage }}
          style={{ height: 250, width: "100%" }}
        />
        <Text style={styles.label}>PHP {SubscriptionAmount}</Text>
        <Text style={styles.label}>
          Status - {SubscriptionStatus?.toUpperCase()}
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
  label: {
    fontSize: 18,
  },
});
